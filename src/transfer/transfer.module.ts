import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { Transfer } from '../typeorm/entities/transfer.entity';
import { Student } from '../typeorm/entities/Users/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Student])],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}