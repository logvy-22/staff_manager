import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../users/interfaces/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDTO } from '../users/interfaces/login-user.dto';
import { RegistrationStatus } from './interfaces/registrationStatus.interface'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validate(userData: LoginUserDTO): Promise<User | null> {
    const dbUser = await this.usersService.findByEmail(userData.email);
    if (dbUser && (await dbUser.comparePassword(userData.password))) {
      return dbUser;
    }

    return null;
  }

  async validateUserToken(payload: { id: string }): Promise<User> {
    return await this.usersService.findById(payload.id);
  }

  async login(
    user: LoginUserDTO,
  ): Promise<{ accessToken: string } | { status: number }> {
    const userData = await this.validate(user);
    if (!userData) {
      return { status: 404 };
    }
    const accessToken = this.jwtService.sign({ id: userData.id });

    return { accessToken };
  }

  async register(user: CreateUserDTO): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.create(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }
}
