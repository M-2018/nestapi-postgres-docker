import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateOrderDto } from '../dto/create-order.dto';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    return this.ordersService.addOrder(userId, products, createOrderDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
}
