import { NestFactory } from '@nestjs/core';
// import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './configuration/configuration.service';

async function bootstrap() {
    const configService = new ConfigService('.env');
    const app = await NestFactory.create(AppModule);
    app.listen(configService.EXPRESS_PORT, () => console.log(`Order Service is running on port ${configService.EXPRESS_PORT}`));
}
bootstrap();
