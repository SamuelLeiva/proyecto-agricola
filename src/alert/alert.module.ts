import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { DatabaseModule } from 'src/database/database.module';
import { alertProviders } from './entities/alert.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AlertController],
  providers: [
    ...alertProviders,
    AlertService
  ],
})
export class AlertModule {}
