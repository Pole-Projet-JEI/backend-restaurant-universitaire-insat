import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { Transfer } from '../typeorm/entities/transfer.entity';
import { Wallet } from '../typeorm/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Wallet])],
  controllers: [TransferController],
  providers: [TransferService],
  exports: [TransferService]
})
export class TransferModule {}