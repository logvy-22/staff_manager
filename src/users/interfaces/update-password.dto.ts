import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty() prevPassword: string;
  @IsNotEmpty() nextPassword: string;
}
