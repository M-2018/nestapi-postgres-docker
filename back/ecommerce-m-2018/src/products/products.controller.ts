import {
  Body,
  Controller,
  // Delete,
  Get,
  // HttpCode,
  Param,
  // Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/roles/roles.decorator';
import { Role } from '../users/enum/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Product } from './product.interface';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 5);
  }
  @Get('seeder')
  async addProducts() {
    return this.productsService.addProducts();
  }
  @Get(':id')
  @UsePipes(UuidValidationPipe)
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(
    @Param('id', UuidValidationPipe) id: string,
    @Body() product: any,
  ) {
    return this.productsService.updateProducts(id, product);
  }
}
