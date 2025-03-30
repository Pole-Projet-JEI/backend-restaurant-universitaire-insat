import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from '../typeorm/entities/order.entity';
import { Student } from '../typeorm/entities/Users/student.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Student]), 
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
  ],
})
export class OrderModule {}