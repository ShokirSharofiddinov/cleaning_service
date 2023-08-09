import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;
    app.useGlobalPipes(new ValidationPipe());
    
    const config = new DocumentBuilder()
      .setTitle('cleaning-service Project')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NestJs, Postgress, Sequielize, Swagger')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    app.use(cookieParser());
    SwaggerModule.setup('/api/docs', app, document);
    app.setGlobalPrefix('/api');
    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
