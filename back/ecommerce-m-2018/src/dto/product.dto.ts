import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class ProductDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  stock?: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  imgUrl?: string;
}
