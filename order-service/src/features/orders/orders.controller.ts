import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderStatus } from "./enum/order.enum";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.ordersService.findOne(id);
  }

  @Put(":id")
  async cancelOrder(@Param("id") id: number) {
    return await this.ordersService.update(id, {
      status: OrderStatus.CANCELLED,
    });
  }
}
