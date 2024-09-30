import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddlewareGlobal } from './middlewares/logger-middleware/logger-middleware.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(LoggerMiddlewareGlobal);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API ECommerce')
    .setDescription('API para Ecommerce con Nest')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
