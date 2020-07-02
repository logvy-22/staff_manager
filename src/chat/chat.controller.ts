import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Delete,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { ChatService } from './chat.service';
import { CreateChatDTO } from './interfaces/create-chat.dto';
import { UpdateChatMessageDTO } from './interfaces/update-chat-message.dto';
import { CreateChatMessageDTO } from './interfaces/create-chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getDialogs(@Req() request): Promise<Chat[]> {
    return this.chatService.getDialogs(request.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string): Promise<Chat> {
    return this.chatService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() request, @Body() body: CreateChatDTO): Promise<Chat> {
    return this.chatService.create(request.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.chatService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/message')
  getMessages(@Param('id') id: string): Promise<Message[]> {
    return this.chatService.getMessages(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/message')
  createMessage(
    @Param('id') id: string,
    @Body() body: CreateChatMessageDTO,
  ): Promise<Message> {
    return this.chatService.createMessage(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':chatId/message/:messageId')
  updateMessage(
    @Param('chatId') chatId: string,
    @Param('messageId') messageId: string,
    @Body() body: UpdateChatMessageDTO,
  ): Promise<Message> {
    return this.chatService.updateMessage(chatId, messageId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':chatId/message/:messageId')
  deleteMessage(
    @Param('chatId') chatId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.chatService.deleteMessage(chatId, messageId);
  }
}
