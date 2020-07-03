import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Chat } from '../entities/chat.entity';
import { User } from '../entities/user.entity';
import { Message } from '../entities/message.entity';
import { CreateChatDTO } from './interfaces/create-chat.dto';
import { UpdateChatMessageDTO } from './interfaces/update-chat-message.dto';
import { CreateChatMessageDTO } from './interfaces/create-chat-message.dto';
import { Pagination } from './interfaces/paginate-results.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,

    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  private logger = new Logger(ChatService.name);

  getDialogs(userId: string): Promise<Chat[]> {
    const result = this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.firstUser = :userId OR chat.secondUser = :userId', {
        userId,
      })
      .leftJoinAndSelect('chat.firstUser', 'firstUser')
      .leftJoinAndSelect('chat.secondUser', 'secondUser')
      .leftJoinAndSelect('chat.messages', 'messages')
      .orderBy({ 'messages.createDate': 'DESC' })
      //.limit(1)
      .leftJoinAndSelect('messages.user', 'user');
    this.logger.log(result.getQuery());

    return result.getMany();
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

    chat.createDate = new Date();
    chat.firstUser = await User.findOne(id);
    chat.secondUser = await User.findOne(secondUser);
    chat.messages = [];

    return await this.chatRepository.save(chat);
  }

  delete(id: string) {
    return this.chatRepository.delete({ id });
  }

  async getMessages(
    id: string,
    { take = 30, skip = 0 }: { take: number; skip: number },
  ): Promise<Pagination<Message[]>> {
    const [result, total] = await this.messageRepository.findAndCount({
      relations: ['chat', 'user'],
      where: {
        chat: { id },
      },
      order: {
        createDate: 'DESC',
      },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
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
