import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateGalleryDTO {
  @IsNotEmpty() title: string;

  @IsNotEmpty() description: string;

  @IsNotEmpty() @IsUrl() image: string;
}
