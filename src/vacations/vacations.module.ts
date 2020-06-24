import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vacation } from '../entities/vacation.entity';
import { VacationsService } from './vacations.service';
import { VacationsController } from './vacations.controller';

@Module({
  providers: [VacationsService],
  imports: [TypeOrmModule.forFeature([Vacation])],
  controllers: [VacationsController],
})
export class VacationsModule {}
