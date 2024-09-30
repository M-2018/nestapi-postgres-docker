import {
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDto } from '../dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty()
  products: ProductDto[];
}
