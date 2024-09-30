import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { ProductDto } from 'src/dto/product.dto';
import { Order } from 'src/entities/orders.entity';
import { OrderResponse } from 'src/interfaces/order-response';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: OrdersRepository;

  const mockOrdersRepository = {
    addOrder: jest.fn(),
    getOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addOrder', () => {
    it('should create and return an order response', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 'user-id-123',
        products: [
          { id: 'product-id-123', price: 100, stock: 1 },
        ] as ProductDto[],
      };

      const orderResponse: OrderResponse = {
        id: 'order-id-123',
        date: new Date(),
        orderDetail: {
          id: 'order-detail-id-123',
          price: 100,
        },
      };

      mockOrdersRepository.addOrder.mockResolvedValue(orderResponse);

      const result = await service.addOrder(
        createOrderDto.userId,
        createOrderDto.products,
        createOrderDto,
      );
      expect(result).toEqual(orderResponse);
      expect(repository.addOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('getOrder', () => {
    it('should return an order by id', async () => {
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
      mockOrdersRepository.getOrder.mockResolvedValue(order);

      const result = await service.getOrder('order-id-123');
      expect(result).toEqual(order);
      expect(repository.getOrder).toHaveBeenCalledWith('order-id-123');
    });
  });
});
