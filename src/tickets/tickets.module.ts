import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/typeorm/entities/ticket.entity';
import { Wallet } from 'src/typeorm/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket,Wallet])],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
