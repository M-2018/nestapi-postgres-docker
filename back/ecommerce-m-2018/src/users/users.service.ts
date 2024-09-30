import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getPaginatedUsers(page: number, limit: number): Promise<User[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return this.usersRepository.getPaginatedUsers(startIndex, endIndex);
  }

  async getUserById(
    id: string,
  ): Promise<Omit<User, 'password' | 'isAdmin'> | undefined> {
    return this.usersRepository.getById(id);
  }

  async createUser(user: CreateUserDto): Promise<string> {
    return this.usersRepository.createUser(user);
  }

  async updateUser(id: string, updatedUser: CreateUserDto) {
    return this.usersRepository.updateUser(id, updatedUser);
  }

  async deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
