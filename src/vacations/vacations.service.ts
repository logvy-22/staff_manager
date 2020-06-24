import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Vacation } from '../entities/vacation.entity';
import { User } from '../entities/user.entity';
import { UpdateVacationDTO } from './interfaces/update-vacation.dto';
import { CreateVacationDTO } from './interfaces/create-vacation.dto';

@Injectable()
export class VacationsService {
  constructor(
    @InjectRepository(Vacation)
    private vacationRepository: Repository<Vacation>,
  ) {}

  getAll(): Promise<Vacation[]> {
    return this.vacationRepository.find({ relations: ['user'] });
  }

  async getByUserId(userId: string): Promise<Vacation[]> {
    return await this.vacationRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  async findById(id: string): Promise<Vacation> {
    return await this.vacationRepository.findOne({ id });
  }

  async create(vacationDTO: CreateVacationDTO): Promise<Vacation> {
    const { startDate, endDate, userId } = vacationDTO;
    const vacation = new Vacation();

    vacation.startDate = startDate;
    vacation.endDate = endDate;
    vacation.user = await User.findOne(userId);

    return await this.vacationRepository.save(vacation);
  }

  delete(id: string) {
    return this.vacationRepository.delete({ id });
  }

  async update(id: string, vacationDTO: UpdateVacationDTO): Promise<Vacation> {
    const vacation = await this.findById(id);
    return await this.vacationRepository.save({ ...vacation, ...vacationDTO });
  }
}
