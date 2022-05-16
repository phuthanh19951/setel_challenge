import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { ConfigService } from "src/configuration/configuration.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRepository } from "./order.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    ClientsModule.registerAsync([{
		    name: 'PAYMENT_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.PAYMENT_SERVICE.HOST,
            port: configService.PAYMENT_SERVICE.PORT,
          },
        }),
      },
    ]),
    TypeOrmModule.forFeature([OrderRepository]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
