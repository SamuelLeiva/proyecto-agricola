import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { WeatherModule } from './weather/weather.module';
import { CropModule } from './crop/crop.module';
import { AuthModule } from './auth/auth.module';
import { EncoderService } from './encoder/encoder.service';

@Module({
  imports: [DatabaseModule, UserModule, AlertModule, WeatherModule, CropModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, EncoderService],
})
export class AppModule {}
