import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateChatDTO {
  @IsNotEmpty() @IsUUID() secondUser: string;
}
