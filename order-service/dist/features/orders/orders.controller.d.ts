import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    findOne(id: number): Promise<import("./entities/order.entity").Order>;
    cancelOrder(id: number): Promise<import("typeorm").UpdateResult>;
}
