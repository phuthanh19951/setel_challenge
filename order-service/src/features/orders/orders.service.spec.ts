import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { OrderStatus } from './enum/order.enum';
import { OrderRepository } from './order.repository';
import { OrdersService } from './orders.service';

class ApiServiceMock {
  create(dto: any) {
     return {};
  }
  findOne() {
    return {};
  }
  update(id: string, dto: any) {
    return {};
  }
}

describe('OrdersService', () => {
  let orderService: OrdersService;

  const ApiServiceProvider = {
    provide: OrdersService,
    useClass: ApiServiceMock
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([{ name: 'PAYMENT_SERVICE', transport: Transport.TCP }])
      ],
      providers: [
        OrdersService,
        ApiServiceProvider,
        {
          provide: AuthService,
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(OrderRepository),
          useValue: jest.fn()
        }
      ],
    }).compile();

    orderService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('should call save method with expected params', async () => {
    const body = {
      totalAmount: 5,
      totalQuantity: 1000
    };
    const createOrderSpy = jest.spyOn(orderService, 'create');

    orderService.create(body);
    expect(createOrderSpy).toHaveBeenCalledWith(body);
  });

  it('should call findOne method with expected params', async () => {
    const orderId = 1;

    const findOneOrderSpy = jest.spyOn(orderService, 'findOne');

    orderService.findOne(orderId);
    expect(findOneOrderSpy).toHaveBeenCalledWith(orderId);
  });

  it('should call update method with expected params', async () => {
    const orderId = 1;

    const updateOrderSpy = jest.spyOn(orderService, 'update');

    orderService.update(orderId, { status: OrderStatus.CANCELLED});
    expect(updateOrderSpy).toHaveBeenCalledWith(orderId, { status: OrderStatus.CANCELLED});
  });
});
