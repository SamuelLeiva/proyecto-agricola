import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import { CreateWeatherDto } from 'src/weather/dto/create-weather.dto';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  createCrop(@Body() newCrop: CreateCropDto): Promise<Crop | HttpException> {
    return this.cropService.createCrop(newCrop);
  }

  @Post(':id/weather')
  createCropWeather(
    @Param('id', ParseIntPipe) id: number,
    @Body() weather: CreateWeatherDto
  ){
    return this.cropService.createCropWeather(id, weather);
  }

  @Get()
  getAllCrops(): Promise<Crop[]> {
    return this.cropService.getAllCrops();
  }

  @Get(':id')
  getCrop(@Param('id', ParseIntPipe) id: number): Promise<Crop | HttpException> {
    console.log(typeof id);
    return this.cropService.getCrop(id);
  }

  @Patch(':id')
  updateCrop(@Param('id', ParseIntPipe) id: number, @Body() crop: UpdateCropDto) {
    return this.cropService.updateCrop(id, crop);
  }

  @Delete(':id')
  deleteCrop(@Param('id', ParseIntPipe) id: number) {
    return this.cropService.deleteCrop(id);
  }
}
