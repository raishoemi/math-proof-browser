import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { ProofsModule } from './proofs.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ProofsModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Proofs API')
    .setDescription('Proofs API description')
    .setVersion('1.0')
    .addTag('proofs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
