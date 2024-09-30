import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async addCategories() {
    for (const element of data) {
      const categoryExists = await this.categoryRepository.findOne({
        where: { name: element.category },
      });
      if (!categoryExists) {
        const newCategory = this.categoryRepository.create({
          name: element.category,
        });
        await this.categoryRepository.save(newCategory);
      }
    }
    return 'Categories added';
  }
}
