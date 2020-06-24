import { IsNotEmpty, IsUUID, IsDate } from 'class-validator';

export class CreateVacationDTO {
  @IsNotEmpty() @IsDate() startDate: Date;

  @IsNotEmpty() @IsDate() endDate: Date;

  @IsNotEmpty() @IsUUID() userId: string;
}
