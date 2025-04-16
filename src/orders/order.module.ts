import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from '../typeorm/entities/order.entity';
import { Student } from '../typeorm/entities/Users/Student.entity';
import { Wallet } from '../typeorm/entities/wallet.entity';
import { Ticket } from 'src/typeorm/entities/ticket.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Student,Wallet,Ticket]), 
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
  ],
})
export class OrderModule {}