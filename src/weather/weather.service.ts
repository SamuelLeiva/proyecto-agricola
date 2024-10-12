import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {

  constructor(
    @Inject('WEATHER_REPOSITORY')
    private weatherRepository: Repository<Weather>
  ) { }

  async createWeather(weather: CreateWeatherDto) {
    const newWeather = this.weatherRepository.create(weather);
    return this.weatherRepository.save(newWeather);
  }

  findAll() {
    return `This action returns all weather`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
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

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
