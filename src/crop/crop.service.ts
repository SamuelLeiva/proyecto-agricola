import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { Weather } from 'src/weather/entities/weather.entity';
import { CreateWeatherDto } from 'src/weather/dto/create-weather.dto';

@Injectable()
export class CropService {

  constructor(
    @Inject('CROP_REPOSITORY')
    private cropRepository: Repository<Crop>,
    @Inject('WEATHER_REPOSITORY')
    private weatherRepository: Repository<Weather>,
  ) { }

  async createCrop(crop: CreateCropDto) {
    const newCrop = this.cropRepository.create(crop);
    return this.cropRepository.save(newCrop);
  }

  async createCropWeather(cropId: number, weather: CreateWeatherDto){
    const cropFound = await this.cropRepository.findOne({where: { id: cropId}});

    if(!cropFound) {
      return new HttpException("Crop not found", HttpStatus.NOT_FOUND);
    }

    const newWeather = this.weatherRepository.create(weather);
    const savedWeather = await this.weatherRepository.save(newWeather);
    cropFound.weather = savedWeather;

    return this.cropRepository.save(cropFound);
  }

  async getAllCrops(): Promise<Crop[]> {
    return this.cropRepository.find();
  }

  async getCrop(id: number) {
    const cropFound = await this.cropRepository.findOne({
      where: { id }
    });

    if (!cropFound) {
      return new HttpException("Crop not found", HttpStatus.NOT_FOUND);
    }

    return cropFound;
  }

  async updateCrop(id: number, crop: UpdateCropDto) {
    const cropFound = await this.cropRepository.findOne({
      where: {
        id
      }
    })

    if(!cropFound) {
      return new HttpException("Crop not found", HttpStatus.NOT_FOUND);
    }

    const updatedCrop = Object.assign(cropFound, crop);
    return this.cropRepository.save(updatedCrop);
  }

  async deleteCrop(id: number) {
    const result = await this.cropRepository.delete({ id });

    if(result.affected === 0){
      return new HttpException("Crop not found", HttpStatus.NOT_FOUND)
    }

    return result;
  }
}
