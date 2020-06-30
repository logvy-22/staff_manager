import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Gallery } from '../entities/gallery.entity';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';

@Module({
  providers: [GalleryService],
  imports: [TypeOrmModule.forFeature([Gallery])],
  controllers: [GalleryController],
})
export class GalleryModule {}
