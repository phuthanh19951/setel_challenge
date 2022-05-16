import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from './configuration/configuration.service';

async function bootstrap() {
  const configService = new ConfigService('.env');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: configService.EXPRESS_HOST,
      port: configService.EXPRESS_PORT,
    },
  });
  app.listen();
}
bootstrap();
