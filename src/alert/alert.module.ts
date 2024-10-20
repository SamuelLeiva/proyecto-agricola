import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CropModule } from 'src/crop/crop.module';
import { alertProviders } from './providers/alert.providers';

@Module({
  imports: [DatabaseModule, CropModule],
  controllers: [AlertController],
  providers: [
    ...alertProviders,
    AlertService
  ],
})
export class AlertModule {}
