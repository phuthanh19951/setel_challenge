import { Injectable } from "@nestjs/common";
import { OrderMessageDto } from "./dto/order-message.dto";
import { PaymentStatus } from "./enum/payment.enum";
import { PaymentRepository } from "./payment.repository";

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository){}
  async create(order: OrderMessageDto): Promise<string> {
    const paymentStatus = this.generatePaymentStatus() ? PaymentStatus.CONFIRMED : PaymentStatus.DECLINED;
    await this.paymentRepository.save({ orderId: order.id, totalAmount: order.totalAmount, status:  paymentStatus });
    return paymentStatus;
  }

  generatePaymentStatus() {
    return Math.random() < 0.5;
  }
}
