import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  const PORT = process.env.PORT || 3000
  console.log("Trying to run on PORT: ", PORT)
  
  await app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is up and running on port: ", PORT)
  });
}
bootstrap();
