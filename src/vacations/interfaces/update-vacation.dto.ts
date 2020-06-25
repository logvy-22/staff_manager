import { IsOptional, IsEnum, IsDateString } from 'class-validator';

import { VacationStatus } from '../../constants/VacationStatus';

export class UpdateVacationDTO {
  @IsOptional() @IsDateString() startDate?: Date;

  @IsOptional() @IsDateString() endDate?: Date;

  @IsOptional() @IsEnum(VacationStatus) status?: VacationStatus;
}
