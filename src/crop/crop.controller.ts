import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
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
  findAll() {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropService.update(+id, updateCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropService.remove(+id);
  }
}
