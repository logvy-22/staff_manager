import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDTO } from './interfaces/create-user.dto';
import { UpdatePasswordDTO } from './interfaces/update-password.dto';
import { UpdateUserDTO } from './interfaces/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(userDto: CreateUserDTO): Promise<User> {
    const { email } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(id: string, updatedUserData: UpdateUserDTO): Promise<User> {
    const user = await this.findById(id);
    const { location } = user;

    if (!updatedUserData.location && !user.location) {
      return await this.userRepository.save({
        ...user,
        ...updatedUserData,
      });
    } else {
      const newLocation = `(${location.x}, ${location.y})` as any;
      const oldUserData = { ...user, location: newLocation };
      return await this.userRepository.save({
        ...oldUserData,
        ...updatedUserData,
      });
    }
  }

  async changePassword(
    id: string,
    { prevPassword, nextPassword }: UpdatePasswordDTO,
  ) {
    const user = await this.findById(id);

    if (!(await user.comparePassword(prevPassword))) {
      throw new HttpException('Incorrect prev password', HttpStatus.FORBIDDEN);
    }
    user.password = nextPassword;

    return await this.userRepository.save(user);
  }
}
