import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { LoggerMiddlewareGlobal } from 'src/middlewares/logger-middleware/logger-middleware.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';

const API_PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High performance laptop',
    price: 1000,
    stock: 50,
    imgUrl: 'https://m.media-amazon.com/images/I/71Nsxgmi7xL._AC_SL1500_.jpg',
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest model smartphone',
    price: 800,
    stock: 100,
    imgUrl:
      'https://m.media-amazon.com/images/I/71HGYdYb9tL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Noise-cancelling headphones',
    price: 200,
    stock: 200,
    imgUrl: 'https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UY218_.jpg',
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    {
      provide: 'API_PRODUCTS',
      useValue: API_PRODUCTS,
    },
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareGlobal).forRoutes('products');
  }
}
