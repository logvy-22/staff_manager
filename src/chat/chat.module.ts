import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatService],
  imports: [
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [ChatController],
})
export class ChatModule {}
