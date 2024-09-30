import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private sanitizeUser(user: User): User {
    return { ...user, password: '' };
  }

  async getPaginatedUsers(page: number, limit: number): Promise<User[]> {
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;

    const startIndex = (page - 1) * limit;

    const [users] = await this.usersRepository.findAndCount({
      skip: startIndex,
      take: limit,
    });
    return users.map(this.sanitizeUser);
  }

  async getById(
    id: string,
  ): Promise<Omit<User, 'password' | 'isAdmin'> | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      // Desestructuro el objeto 'user' para eliminar los campos 'password' e 'isAdmin'
      const { password, isAdmin, ...userWithoutSensitiveData } = user;
      return userWithoutSensitiveData;
    }
    return undefined;
  }

  async createUser(user: Partial<User>): Promise<string> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser.id;
  }

  // async updateUser(
  //   id: string,
  //   updatedUser: Partial<User>,
  // ): Promise<string | undefined> {
  //   const result = await this.usersRepository.update(id, updatedUser);
  //   if (result.affected > 0) {
  //     return 'User updated: ' + id;
  //   }
  //   return undefined;
  // }

  async updateUser(
    id: string,
    updatedUser: Partial<User> & { confirmPassword?: string },
  ): Promise<string | undefined> {
    // Usar desestructuración para eliminar confirmPassword del objeto de actualización
    const { confirmPassword, ...userUpdates } = updatedUser;

    const result = await this.usersRepository.update(id, userUpdates);
    if (result.affected > 0) {
      return 'User updated: ' + id;
    }
    return undefined;
  }

  async deleteUser(id: string): Promise<string | undefined> {
    const result = await this.usersRepository.delete(id);
    if (result.affected > 0) {
      return 'User deleted: ' + id;
    }
    return undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
