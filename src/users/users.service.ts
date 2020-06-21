import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './interfaces/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDTO): Promise<void> {
    const entity = Object.assign(new User(), user);
    await this.userRepository.save(entity);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
