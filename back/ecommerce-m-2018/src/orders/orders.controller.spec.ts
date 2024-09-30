import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/orders.entity';
import { OrderResponse } from '../interfaces/order-response';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

const mockOrdersService = {
  addOrder: jest.fn(),
  getOrder: jest.fn(),
};

class AuthGuardMock {
  canActivate() {
    return true;
  }
}

const mockJwtService = {};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
        {
          provide: AuthGuard,
          useClass: AuthGuardMock,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addOrder', () => {
    it('should call the service to add an order and return the result', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 'user-id-123',
        products: [{ id: 'product-id-123', price: 100, stock: 1 }],
      };

      const orderResponse: OrderResponse = {
        id: 'order-id-123',
        date: new Date(),
        orderDetail: {
          id: 'order-detail-id-123',
          price: 100,
        },
      };

      mockOrdersService.addOrder.mockResolvedValue(orderResponse);

      const result = await controller.addOrder(createOrderDto);
      expect(result).toEqual(orderResponse);
      expect(service.addOrder).toHaveBeenCalledWith(
        createOrderDto.userId,
        createOrderDto.products,
        createOrderDto,
      );
    });
  });

  describe('getOrder', () => {
    it('should call the service to get an order by id and return the result', async () => {
      const order: Order = {
        id: 'order-id-123',
        date: new Date(),
        user: { id: 'user-id-123' },
        orderDetail: {
          id: 'order-detail-id-123',
          price: 100,
          products: [{ id: 'product-id-123', price: 100, stock: 1 }],
        },
      } as any;

      mockOrdersService.getOrder.mockResolvedValue(order);

      const result = await controller.getOrder('order-id-123');
      expect(result).toEqual(order);
      expect(service.getOrder).toHaveBeenCalledWith('order-id-123');
    });
  });
});
