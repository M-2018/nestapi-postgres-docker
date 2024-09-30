import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  Length,
  IsNotEmpty,
  IsNumber,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
  )
  //Valida una contraseña de 8 a 15 caracteres que contenga al menos una letra minúscula, una letra mayúscula, un número, y un carácter especial de !@#$%^&*
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;

  @IsString()
  @Length(3, 80)
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  phone: number;

  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsEmpty()
  @ApiProperty()
  isAdmin?: boolean;
}
