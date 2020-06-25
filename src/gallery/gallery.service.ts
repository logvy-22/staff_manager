import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Gallery } from '../entities/gallery.entity';
import { UpdateGalleryDTO } from './interfaces/update-gallery.dto';
import { CreateGalleryDTO } from './interfaces/create-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  getAll(): Promise<Gallery[]> {
    return this.galleryRepository.find();
  }

  async findById(id: string): Promise<Gallery> {
    return await this.galleryRepository.findOne({ id });
  }

  async create(galleryDTO: CreateGalleryDTO): Promise<Gallery> {
    const { title, description, image } = galleryDTO;
    const gallery = new Gallery();

    gallery.title = title;
    gallery.description = description;
    gallery.image = image;

    return await this.galleryRepository.save(gallery);
  }

  delete(id: string) {
    return this.galleryRepository.delete({ id });
  }

  async update(id: string, galleryDTO: UpdateGalleryDTO): Promise<Gallery> {
    const gallery = await this.findById(id);
    return await this.galleryRepository.save({ ...gallery, ...galleryDTO });
  }
}
