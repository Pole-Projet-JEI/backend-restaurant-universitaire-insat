import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { Transfer } from '../typeorm/entities/transfer.entity';
import { Student } from 'src/typeorm/entities/Users/Student.entity';
import { TicketsService } from '../tickets/tickets.service';
import { Ticket } from '../typeorm/entities/ticket.entity';
import { Wallet } from '../typeorm/entities/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transfer, Student, Wallet, Ticket])],
  controllers: [TransferController],
  providers: [TransferService, TicketsService],
  exports: [TransferService],
})
export class TransferModule {}