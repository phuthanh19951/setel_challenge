import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentRepository } from "./payment.repository";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PaymentRepository])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
