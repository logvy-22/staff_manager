import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Delete,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Gallery } from '../entities/gallery.entity';
import { GalleryService } from './gallery.service';
import { UpdateGalleryDTO } from './interfaces/update-gallery.dto';
import { CreateGalleryDTO } from './interfaces/create-gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Gallery[]> {
    return this.galleryService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string): Promise<Gallery> {
    return this.galleryService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateGalleryDTO): Promise<Gallery> {
    return this.galleryService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateGalleryDTO,
  ): Promise<Gallery> {
    return this.galleryService.update(id, body);
  }
}
