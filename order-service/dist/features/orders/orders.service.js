"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_service_1 = require("../auth/auth.service");
const order_enum_1 = require("./enum/order.enum");
const order_repository_1 = require("./order.repository");
let OrdersService = class OrdersService {
    constructor(client, ordersRepository, authService) {
        this.client = client;
        this.ordersRepository = ordersRepository;
        this.authService = authService;
    }
    async create(createOrderDto) {
        const newOrder = await this.ordersRepository.save(createOrderDto);
        if (newOrder) {
            const paymentResponse = await this.client
                .send("createPayment", {
                token: this.authService.getDummyToken(),
                order: { id: newOrder.id, totalAmount: newOrder.totalAmount },
            })
                .toPromise();
            const orderStatus = paymentResponse === order_enum_1.OrderStatus.CONFIRMED
                ? order_enum_1.OrderStatus.CONFIRMED
                : order_enum_1.OrderStatus.CANCELLED;
            const { affected } = await this.update(newOrder.id, { status: orderStatus });
            if (orderStatus === order_enum_1.OrderStatus.CONFIRMED && affected) {
                setTimeout(() => {
                    this.update(newOrder.id, { status: order_enum_1.OrderStatus.DELIVERED });
                }, 10000);
            }
        }
        return newOrder;
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne(id);
        if (!order) {
            throw new common_1.NotFoundException(`Cannot found an order with id: ${id}`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        return await this.ordersRepository.update(id, updateOrderDto);
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("PAYMENT_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        order_repository_1.OrderRepository,
        auth_service_1.AuthService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map