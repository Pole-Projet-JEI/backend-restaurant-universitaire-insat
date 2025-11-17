import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { Wallet } from 'src/typeorm/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/typeorm/entities/ticket.entity';
import { Student } from 'src/typeorm/entities/Users/Student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Ticket, Student])],
  controllers: [WalletsController],
  providers: [WalletsService],
  exports: [WalletsService],
})
export class WalletsModule {}
