import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { OrdersModule } from './features/orders/orders.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './configuration/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.DATABASE_CONFIG,
        };
      },
    }),
    ConfigurationModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
