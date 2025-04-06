import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { Wallet } from 'src/typeorm/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/typeorm/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Ticket])],
  controllers: [WalletsController],
  providers: [WalletsService]
})
export class WalletsModule {}
