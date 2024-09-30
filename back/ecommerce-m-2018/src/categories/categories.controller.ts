import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  async addCategories() {
    return this.categoriesService.addCategories();
  }
  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }
}
