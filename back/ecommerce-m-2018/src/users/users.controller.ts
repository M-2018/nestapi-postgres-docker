import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userWithoutPassword } from '../interfaces/userWithoutPassword.interface';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from './enum/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    const users = await this.usersService.getPaginatedUsers(page, limit);
    return users;
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  async getUserById(
    @Param('id') id: string,
  ): Promise<userWithoutPassword | undefined> {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUser: CreateUserDto,
  ) {
    const modifiedUserId = await this.usersService.updateUser(id, updatedUser);
    return { id: modifiedUserId };
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(UuidValidationPipe)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
