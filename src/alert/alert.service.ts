import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { Crop } from 'src/crop/entities/crop.entity';

@Injectable()
export class AlertService {

  constructor(
    @Inject('ALERT_REPOSITORY')
    private alertRepository: Repository<Alert>,
    @Inject('CROP_REPOSITORY')
    private cropRepository: Repository<Crop>,
  ) { }

  async createAlert(alert: CreateAlertDto) {
    const newAlert = this.alertRepository.create(alert);
    return this.alertRepository.save(newAlert);
  }

  async createCropAlert(cropId: number, alert: CreateAlertDto) {
    const cropFound = await this.cropRepository.findOne({where: { id: cropId}});

    if(!cropFound) {
      return new HttpException("Crop not found", HttpStatus.NOT_FOUND);
    }

    const newAlert = this.alertRepository.create(alert);
    newAlert.crop = cropFound;

    return this.alertRepository.save(newAlert);
  }

  async getAllAlerts(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async getAlert(id: number) {
    const alertFound = await this.alertRepository.findOne({
      where: { id }
    });

    if (!alertFound) {
      return new HttpException("Alert not found", HttpStatus.NOT_FOUND);
    }

    return alertFound
  }

  async updateAlert(id: number, alert: UpdateAlertDto) {
    const alertFound = await this.alertRepository.findOne({
      where: {
        id
      }
    })

    if(!alertFound) {
      return new HttpException("Alert not found", HttpStatus.NOT_FOUND);
    }

    const updatedAlert = Object.assign(alertFound, alert);
    return this.alertRepository.save(updatedAlert);
  }

  async deleteAlert(id: number) {
    const result = await this.alertRepository.delete({ id });

    if(result.affected === 0){
      return new HttpException("Alert not found", HttpStatus.NOT_FOUND)
    }

    return result;
  }
}
