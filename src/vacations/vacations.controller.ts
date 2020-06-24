import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Vacation } from '../entities/vacation.entity';
import { VacationsService } from './vacations.service';
import { UpdateVacationDTO } from './interfaces/update-vacation.dto';
import { CreateVacationDTO } from './interfaces/create-vacation.dto';
import { VacationStatus } from '../constants/VacationStatus';

@Controller('vacations')
export class VacationsController {
  constructor(private readonly vacationsService: VacationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Vacation[]> {
    return this.vacationsService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string): Promise<Vacation> {
    return this.vacationsService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  getUserVacations(@Param('userId') userId: string): Promise<any> {
    return this.vacationsService.getByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateVacationDTO): Promise<Vacation> {
    return this.vacationsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.vacationsService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateVacationDTO,
  ): Promise<Vacation> {
    return this.vacationsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/confirm')
  confirmVacation(@Param('id') id: string): Promise<Vacation> {
    return this.vacationsService.update(id, {
      status: VacationStatus.confirmed,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/decline')
  declineVacation(@Param('id') id: string): Promise<Vacation> {
    return this.vacationsService.update(id, {
      status: VacationStatus.declined,
    });
  }
}
