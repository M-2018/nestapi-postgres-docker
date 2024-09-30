import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponse } from 'src/interfaces/order-response';
import { Order } from '../entities/orders.entity';
import { OrderDetail } from '../entities/order-details.entity';
import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addOrder(createOrderDto: CreateOrderDto): Promise<OrderResponse> {
    const { userId, products } = createOrderDto;

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const order = this.ordersRepository.create({ user, date: new Date() });
    await this.ordersRepository.save(order);

    let totalPrice = 0;
    const validProducts = [];
    for (const productDto of products) {
      const product = await this.productsRepository.findOneBy({
        id: productDto.id,
      });
      if (product && product.stock > 0) {
        totalPrice += product.price;
        product.stock -= 1;
        validProducts.push(product);
        await this.productsRepository.save(product);
      }
    }

    const orderDetail = this.orderDetailsRepository.create({
      price: totalPrice,
      order,
      products: validProducts,
    });
    await this.orderDetailsRepository.save(orderDetail);

    return {
      id: order.id,
      date: order.date,
      orderDetail: {
        id: orderDetail.id,
        price: orderDetail.price, // Convierte el precio si es necesario
      },
    };
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetail', 'orderDetail.products'],
    });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
