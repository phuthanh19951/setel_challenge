import { ClientProxy } from "@nestjs/microservices";
import { AuthService } from "../auth/auth.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { OrderRepository } from "./order.repository";
export declare class OrdersService {
    private readonly client;
    private readonly ordersRepository;
    private readonly authService;
    constructor(client: ClientProxy, ordersRepository: OrderRepository, authService: AuthService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<import("typeorm").UpdateResult>;
}
