import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  async getProducts(page: number, limit: number): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    let inStock = products.filter((product) => product.stock > 0);
    const start = (page - 1) * limit;
    const end = start + +limit;

    inStock = inStock.slice(start, end);
    return inStock;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute();
    });
    return 'Product added';
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productsRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = this.productsRepository.merge(
      existingProduct,
      product,
    );

    await this.productsRepository.save(updatedProduct);

    return updatedProduct;
  }

  async updateImage(id: string, imgUrl: string): Promise<Product> {
    await this.productsRepository.update(id, { imgUrl });
    return this.productsRepository.findOneBy({ id });
  }
}
