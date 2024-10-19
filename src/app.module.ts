import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { WeatherModule } from './weather/weather.module';
import { CropModule } from './crop/crop.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DatabaseModule, 
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10
    }]),
    UserModule, 
    AlertModule, 
    WeatherModule, 
    CropModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
