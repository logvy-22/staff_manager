import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class CreateVacationDTO {
  @IsNotEmpty() @IsDateString() startDate: Date;

  @IsNotEmpty() @IsDateString() endDate: Date;

  @IsNotEmpty() @IsUUID() userId: string;
}
