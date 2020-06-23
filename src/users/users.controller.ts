import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../entities/user.entity';
import { UpdatePasswordDTO } from './interfaces/update-password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
    return this.usersService.updateUser(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() body: UpdatePasswordDTO,
  ): Promise<any> {
    return this.usersService.changePassword(id, body);
  }
}
