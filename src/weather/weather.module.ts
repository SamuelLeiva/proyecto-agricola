import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { DatabaseModule } from 'src/database/database.module';
import { weatherProviders } from './providers/weather.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WeatherController],
  providers: [
    ...weatherProviders,
    WeatherService
  ],
  exports: [
    ...weatherProviders
  ]
})
export class WeatherModule {}
