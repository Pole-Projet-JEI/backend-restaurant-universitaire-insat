import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../typeorm/entities/order.entity';
import { OrderDto } from './order.dto';
import { Status } from '../typeorm/entities/order.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiCreatedResponse({})
  @Post()
  create(@Body() orderData: OrderDto): Promise<Order> {
    return this.orderService.create(orderData);
  }

  @ApiCreatedResponse({})
  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiCreatedResponse({})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @ApiCreatedResponse({})
  @Put(':id')
  update(@Param('id') id: string, @Body() orderData: Partial<OrderDto>): Promise<Order> {
    return this.orderService.update(+id, orderData);
  }

  @ApiCreatedResponse({})
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.orderService.delete(+id);
  }

  @ApiCreatedResponse({})
  @Get('status/:status')
  getByStatus(@Param('status') status: Status): Promise<Order[]> {
    return this.orderService.getOrdersByStatus(status);
  }

  @ApiCreatedResponse({})
  @Get('student/:studentId')
  getStudentOrders(@Param('studentId') studentId: string): Promise<Order[]> {
    return this.orderService.getStudentOrders(+studentId);
  }
}