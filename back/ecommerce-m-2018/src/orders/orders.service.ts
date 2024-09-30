import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { ProductDto } from 'src/dto/product.dto';
import { Order } from 'src/entities/orders.entity';
import { OrderResponse } from 'src/interfaces/order-response';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(
    userId: string,
    products: ProductDto[],
    createOrderDto: CreateOrderDto,
  ): Promise<OrderResponse> {
    return this.ordersRepository.addOrder(createOrderDto);
  }

  async getOrder(id: string): Promise<Order> {
    return this.ordersRepository.getOrder(id);
  }
}
