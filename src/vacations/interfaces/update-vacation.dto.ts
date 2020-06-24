import { IsOptional, IsEnum, IsDate } from 'class-validator';

import { VacationStatus } from '../../constants/VacationStatus';

export class UpdateVacationDTO {
  @IsOptional() @IsDate() startDate: Date;

  @IsOptional() @IsDate() endDate: Date;

  @IsOptional() @IsEnum(VacationStatus) status: VacationStatus;
}
