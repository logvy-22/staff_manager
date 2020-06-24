import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @IsNotEmpty() @MinLength(6) prevPassword: string;
  
  @IsNotEmpty() @MinLength(6) nextPassword: string;
}
