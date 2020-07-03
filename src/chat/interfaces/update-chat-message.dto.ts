import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { MessageType } from '../../constants/MessageType';

export class UpdateChatMessageDTO {
  @IsOptional() @IsDateString() updateDate?: Date;

  @IsOptional() @IsEnum(MessageType) type?: MessageType;

  @IsOptional() text?: string;
}
