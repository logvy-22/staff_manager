import {
  IsEmail,
  IsOptional,
  IsAlpha,
  IsString,
  IsBase64,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional() @IsEmail() email?: string;

  @IsOptional() @IsAlpha() firstName?: string;

  @IsOptional() @IsAlpha() lastName?: string;

  @IsOptional() @IsBase64() photo?: Buffer;

  @IsOptional() @IsAlpha() department?: string;

  @IsOptional() @IsAlpha() position?: string;

  @IsOptional() @IsString() location?: string;

  @IsOptional() @IsBoolean() isActive?: boolean;

  @IsOptional() @IsBoolean() isBanned?: boolean;

  @IsOptional() @IsBoolean() isAdmin?: boolean;
}
