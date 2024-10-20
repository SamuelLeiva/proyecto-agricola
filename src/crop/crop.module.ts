import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { WeatherModule } from 'src/weather/weather.module';
import { DatabaseModule } from 'src/database/database.module';
import { cropProviders } from './providers/crop.providers';


@Module({
  imports: [DatabaseModule, WeatherModule],
  controllers: [CropController],
  providers: [
    ...cropProviders,
    CropService],
    exports: [
      ...cropProviders
    ]
})
export class CropModule {}
