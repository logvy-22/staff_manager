import { IsNotEmpty, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { MessageType } from '../../constants/MessageType';

export class CreateChatMessageDTO {
  @IsNotEmpty() @IsUUID() userId: string;

  @IsNotEmpty() @IsDateString() createDate: Date;

  @IsNotEmpty() @IsEnum(MessageType) type: MessageType;

  @IsNotEmpty() text: string;
}
