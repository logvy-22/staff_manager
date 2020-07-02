import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Chat } from '../entities/chat.entity';
import { User } from '../entities/user.entity';
import { Message } from '../entities/message.entity';
import { CreateChatDTO } from './interfaces/create-chat.dto';
import { UpdateChatMessageDTO } from './interfaces/update-chat-message.dto';
import { CreateChatMessageDTO } from './interfaces/create-chat-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,

    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  getDialogs(userId: string): Promise<Chat[]> {
    return this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.firstUser = :userId OR chat.secondUser = :userId', {
        userId,
      })
      .leftJoinAndSelect('chat.messages', 'messages')
      .where('messages.chat = chat.id')
      .orderBy({ 'messages.createDate': 'DESC' })
      .limit(1)
      .leftJoinAndSelect('messages.user', 'user')
      .getMany();
  }

  async findById(id: string): Promise<Chat> {
    return await this.chatRepository.findOne({
      relations: ['firstUser', 'secondUser'],
      where: { id },
    });
  }

  async create(id: string, chatDTO: CreateChatDTO): Promise<Chat> {
    const { secondUser } = chatDTO;
    const chat = new Chat();

    chat.firstUser = await User.findOne(id);
    chat.secondUser = await User.findOne(secondUser);

    return await this.chatRepository.save(chat);
  }

  delete(id: string) {
    return this.chatRepository.delete({ id });
  }

  getMessages(id: string): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['chat', 'user'],
      where: {
        chat: { id },
      },
    });
  }

  findMessageById(chatId: string, messageId: string): Promise<Message> {
    return this.messageRepository.findOne({
      relations: ['chat', 'user'],
      where: {
        id: messageId,
        chat: { id: chatId },
      },
    });
  }

  async createMessage(
    chatId: string,
    messageDTO: CreateChatMessageDTO,
  ): Promise<Message> {
    const { userId, createDate, type, text } = messageDTO;
    const message = new Message();

    message.type = type;
    message.createDate = createDate;
    message.text = text;
    message.chat = await Chat.findOne(chatId);
    message.user = await User.findOne(userId);

    return await this.messageRepository.save(message);
  }

  async updateMessage(
    chatId: string,
    messageId: string,
    messageDTO: UpdateChatMessageDTO,
  ): Promise<Message> {
    const message = await this.findMessageById(chatId, messageId);
    return this.messageRepository.save({ ...message, ...messageDTO });
  }

  async deleteMessage(chatId: string, messageId: string) {
    const message = await this.findMessageById(chatId, messageId);
    return this.messageRepository.delete(message);
  }
}
