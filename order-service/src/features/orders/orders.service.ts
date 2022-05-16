import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthService } from "../auth/auth.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { OrderStatus } from "./enum/order.enum";
import { OrderRepository } from "./order.repository";

@Injectable()
export class OrdersService {
  constructor(
    @Inject("PAYMENT_SERVICE") private readonly client: ClientProxy,
    private readonly ordersRepository: OrderRepository,
    private readonly authService: AuthService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.ordersRepository.save(createOrderDto);

    if (newOrder) {
      const paymentResponse = await this.client
        .send<string>("createPayment", {
          token: this.authService.getDummyToken(),
          order: { id: newOrder.id, totalAmount: newOrder.totalAmount },
        })
        .toPromise();

      const orderStatus =
        paymentResponse === OrderStatus.CONFIRMED
          ? OrderStatus.CONFIRMED
          : OrderStatus.CANCELLED;

      const { affected } = await this.update(newOrder.id, { status: orderStatus });

      if (orderStatus === OrderStatus.CONFIRMED && affected) {
        setTimeout(() => {
          this.update(newOrder.id, { status: OrderStatus.DELIVERED });
        }, 10000);
      }
    }

    return newOrder;
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Cannot found an order with id: ${id}`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.ordersRepository.update(id, updateOrderDto);
  }
}
