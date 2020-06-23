import {
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  loginUser(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  async registerUser(@Response() res, @Body() body: CreateUserDTO) {
    const result = await this.authService.register(body);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
