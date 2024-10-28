import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://izlrn.com',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  const PORT = process.env.PORT || 3000
  
  await app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is up and running on port: ", PORT)
  });
}
bootstrap();
