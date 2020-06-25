import { IsOptional, IsUrl } from 'class-validator';

export class UpdateGalleryDTO {
  @IsOptional() title?: string;

  @IsOptional() description?: string;

  @IsOptional() @IsUrl() image?: string;
}
