import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const foundUser = await this.usersRepository.findByEmail(user.email);
    if (foundUser) {
      throw new BadRequestException('User exists');
    }
    if (user.password !== user.confirmPassword) {
      throw new BadRequestException('passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Error when hashing the password');
    }
    await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    const { password, confirmPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async signin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credential');
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      sub: user.id,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      token,
      message: 'User logged successfully',
    };
  }
}
