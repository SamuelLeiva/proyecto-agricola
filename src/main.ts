import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { CropModule } from './crop/crop.module';
import { WeatherModule } from './weather/weather.module';
import { AlertModule } from './alert/alert.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ));

  /*const config = new DocumentBuilder()
    .setTitle('API Agricola')
    .setDescription('Descripción de la API')
    .setVersion('1.0')
    .addTag('agricola')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [
      AlertModule,
      CropModule,
      UserModule,
      WeatherModule
    ],
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);

  const setupOptions: SwaggerCustomOptions = {
    yamlDocumentUrl: "api-yaml"
  }

  SwaggerModule.setup('api', app, document, setupOptions);*/

  await app.listen(3000);
}
bootstrap();
