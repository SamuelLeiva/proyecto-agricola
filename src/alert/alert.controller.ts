import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  createAlert(@Body() newAlert: CreateAlertDto): Promise<Alert | HttpException> {
    return this.alertService.createAlert(newAlert);
  }

  @Post(':id/crop')
  createCropAlert(@Param('id', ParseIntPipe) id: number ,@Body() newAlert: CreateAlertDto): Promise<Alert | HttpException> {
    return this.alertService.createCropAlert(id, newAlert);
  }

  @Get()
  getAllAlerts(): Promise<Alert[]> {
    return this.alertService.getAllAlerts();
  }

  @Get(':id')
  getAlert(@Param('id', ParseIntPipe) id: number): Promise<Alert | HttpException> {
    console.log(typeof id);
    return this.alertService.getAlert(id);
  }

  @Patch(':id')
  updateAlert(@Param('id', ParseIntPipe) id: number, @Body() alert: UpdateAlertDto) {
    return this.alertService.updateAlert(id, alert);
  }

  @Delete(':id')
  deleteAlert(@Param('id', ParseIntPipe) id: number) {
    return this.alertService.deleteAlert(id);
  }
}
