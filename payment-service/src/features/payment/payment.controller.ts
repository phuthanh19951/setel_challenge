import { Controller, HttpStatus, Logger, Res, UseGuards } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, TcpContext } from "@nestjs/microservices";
import { Response } from "express";
import { AuthGuard } from "src/guards/auth.guards";
import { OrderMessageDto } from "./dto/order-message.dto";
import { PaymentStatus } from "./enum/payment.enum";
import { PaymentService } from "./payment.service";

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @MessagePattern("createPayment")
  async create(@Payload() data: any): Promise<string> {
    try {
      Logger.log('Create payment.');
      return await this.paymentService.create(data.order);
    } catch (err) {
      Logger.error("Cannot create payment transaction: error", err);
      return PaymentStatus.DECLINED;
    }
  }
}
