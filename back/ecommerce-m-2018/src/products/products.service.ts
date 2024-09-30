import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
// import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    // @Inject('API_PRODUCTS') private apiProducts: Product[],
  ) {}

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  updateProducts(id: string, product: any) {
    return this.productsRepository.updateProduct(id, product);
  }
}
