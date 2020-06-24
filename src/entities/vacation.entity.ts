import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { VacationStatus } from '../constants/VacationStatus';
import { User } from './user.entity';

@Entity({ name: 'vacation' })
export class Vacation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: VacationStatus.active })
  status: VacationStatus;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  endDate: Date;

  @ManyToOne(
    () => User,
    user => user.vacations,
  )
  user: User;
}
