import { ClientsModule, Transport } from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { OrderStatus } from "./enum/order.enum";
import { OrderRepository } from "./order.repository";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

describe("OrdersController", () => {
  let orderController: OrdersController;
  const mockOrderRepository = {
    save: jest.fn((x) => x),
  };

  const ApiServiceProvider = {
    provide: OrdersService,
    useFactory: () => ({
      create: jest.fn(() => {}),
      findOne: jest.fn(() => {}),
      update: jest.fn(() => {})
    })
  }

  let spyService: OrdersService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([{ name: 'PAYMENT_SERVICE', transport: Transport.TCP }])
      ],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        ApiServiceProvider,
        {
          provide: AuthService,
          useValue: jest.fn(),
        },
        {
          provide: OrderRepository,
          useValue: mockOrderRepository
        }
      ],
    }).compile();

    orderController = module.get<OrdersController>(OrdersController);
    spyService = module.get<OrdersService>(OrdersService);
  });

  it("should be defined", () => {
    expect(orderController).toBeDefined();
  });

  describe('create order', () => {
    it("should call create method", async () => {
      const body = {
        totalAmount: 5,
        totalQuantity: 1000
      };

      await orderController.create(body);

      expect(spyService.create).toHaveBeenCalled();
      expect(spyService.create).toHaveBeenCalledWith(body);
    });

    it("should call findOne method", async () => {
      const orderId = 1;
      await orderController.findOne(orderId);

      expect(spyService.findOne).toHaveBeenCalled();
      expect(spyService.findOne).toHaveBeenCalledWith(orderId);
    });

    it("should call cancelOrder method", async () => {
      const orderId = 1;

      await orderController.cancelOrder(orderId);

      expect(spyService.update).toHaveBeenCalled();
      expect(spyService.update).toHaveBeenCalledWith(orderId, { status: OrderStatus.CANCELLED});
    });
  })
});
