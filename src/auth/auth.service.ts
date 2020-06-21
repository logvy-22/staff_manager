import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from '../users/interfaces/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { LoginUserDTO } from '../users/interfaces/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private async validate(userData: LoginUserDTO): Promise<User | null> {
    const dbUser = await this.usersService.findByEmail(userData.email);
    if (dbUser && (await dbUser.comparePassword(userData.password))) {
      return dbUser;
    }

    return null;
  }

  public async login(
    user: LoginUserDTO,
  ): Promise<{ accessToken: string } | { status: number }> {
    const userData = await this.validate(user);
    if (!userData) {
      return { status: 404 };
    }
    const accessToken = this.jwtService.sign({ id: userData.id });

    return { accessToken };
  }

  public async register(user: CreateUserDTO): Promise<void> {
    return await this.usersService.create(user);
  }
}
