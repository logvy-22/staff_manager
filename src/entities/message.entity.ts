import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { MessageType } from '../constants/MessageType';
import { User } from './user.entity';
import { Chat } from './chat.entity';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: MessageType.message })
  type: MessageType;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: () => null,
  })
  updateDate: Date;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(
    () => Chat,
    chat => chat.messages,
  )
  chat: Chat;

  @ManyToOne(
    () => User,
    user => user.messages,
  )
  user: User;
}
