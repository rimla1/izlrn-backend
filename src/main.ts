import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  let httpsOptions;
  try {
    httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/api.izlrn.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/api.izlrn.com/cert.pem'),
    };
  } catch (error) {
    console.error('Error reading HTTPS options: ', error);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  const PORT = process.env.PORT || 443;

  await app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is up and running on port: ', PORT);
  });
}

bootstrap();
