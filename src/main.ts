import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use((req, res, next) => {
  console.log('headers.cookie:', req.headers.cookie);
  console.log('req.cookies:', req.cookies);
  next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
