import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/interfaces/create-user.dto';
import { LoginUserDTO } from '../users/interfaces/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  loginUser(
    @Body() body: LoginUserDTO,
  ): Promise<{ accessToken: string; id: string } | Error> {
    return this.authService.login(body);
  }

  @Post('register')
  registerUser(@Body() body: CreateUserDTO) {
    return this.authService.register(body);
  }
}
