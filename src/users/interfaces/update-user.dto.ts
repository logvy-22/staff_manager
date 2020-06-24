import {
  IsEmail,
  IsOptional,
  IsAlpha,
  ValidateNested,
  IsBase64,
  isBoolean,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional() @IsEmail() email?: string;

  @IsOptional() @IsAlpha() firstName?: string;

  @IsOptional() @IsAlpha() lastName?: string;

  @IsOptional() @IsBase64() photo?: Buffer;

  @IsOptional() @IsAlpha() department?: string;

  @IsOptional() @IsAlpha() position?: string;

  @IsOptional() @ValidateNested() location?: string;

  @IsOptional() @isBoolean() isActive?: boolean;

  @IsOptional() @isBoolean() isBanned?: boolean;

  @IsOptional() @isBoolean() isAdmin?: boolean;
}
