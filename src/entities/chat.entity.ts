import {
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from './user.entity';
import { Message } from './message.entity';

@Entity({ name: 'chat' })
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  @ManyToOne(
    () => User,
    user => user.firstChats,
  )
  firstUser: User;

  @ManyToOne(
    () => User,
    user => user.secondChats,
  )
  secondUser: User;

  @OneToMany(
    () => Message,
    message => message.chat,
  )
  messages: Message[];
}
