import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Weather } from './entities/weather.entity';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() newWeather: CreateWeatherDto): Promise<Weather | HttpException> {
    return this.weatherService.createWeather(newWeather);
  }

  @Get()
  getAllWeathers(): Promise<Weather[]> {
    return this.weatherService.getAllWeathers();
  }

  @Get(':id')
  getWeather(@Param('id', ParseIntPipe) id: number): Promise<Weather | HttpException> {
    console.log(typeof id);
    return this.weatherService.getWeather(id);
  }

  @Patch(':id')
  updateWeather(@Param('id', ParseIntPipe) id: number, @Body() weather: UpdateWeatherDto) {
    return this.weatherService.updateWeather(id, weather);
  }

  @Delete(':id')
  deleteWeather(@Param('id', ParseIntPipe) id: number) {
    return this.weatherService.deleteWeather(id);
  }
}
