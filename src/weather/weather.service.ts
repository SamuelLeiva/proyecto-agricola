import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { Crop } from 'src/crop/entities/crop.entity';

@Injectable()
export class WeatherService {

  constructor(
    @Inject('WEATHER_REPOSITORY')
    private weatherRepository: Repository<Weather>,
  ) { }

  async createWeather(weather: CreateWeatherDto) {
    const newWeather = this.weatherRepository.create(weather);
    return this.weatherRepository.save(newWeather);
  }

  async getAllWeathers(): Promise<Weather[]> {
    return this.weatherRepository.find();
  }

  async getWeather(id: number) {
    const weatherFound = await this.weatherRepository.findOne({
      where: { id }
    });

    if (!weatherFound) {
      return new HttpException("Weather not found", HttpStatus.NOT_FOUND);
    }

    return weatherFound
  }

  async updateWeather(id: number, weather: UpdateWeatherDto) {
    const weatherFound = await this.weatherRepository.findOne({
      where: {
        id
      }
    })

    if(!weatherFound) {
      return new HttpException("Weather not found", HttpStatus.NOT_FOUND);
    }

    const updateWeather = Object.assign(weatherFound, weather);
    return this.weatherRepository.save(updateWeather);
  }

  async deleteWeather(id: number) {
    const result = await this.weatherRepository.delete({ id });

    if(result.affected === 0){
      return new HttpException("Weather not found", HttpStatus.NOT_FOUND)
    }

    return result;
  }
}
