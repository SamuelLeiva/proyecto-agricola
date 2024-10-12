import { Inject, Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';

@Injectable()
export class CropService {

  constructor(
    @Inject('CROP_REPOSITORY')
    private cropRepository: Repository<Crop>
  ) { }

  async createCrop(crop: CreateCropDto) {
    const newCrop = this.cropRepository.create(crop);
    return this.cropRepository.save(newCrop);
  }

  findAll() {
    return `This action returns all crop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crop`;
  }

  update(id: number, updateCropDto: UpdateCropDto) {
    return `This action updates a #${id} crop`;
  }

  remove(id: number) {
    return `This action removes a #${id} crop`;
  }
}
