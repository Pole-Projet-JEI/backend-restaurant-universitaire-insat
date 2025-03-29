import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from 'src/typeorm/entities/transfer.entity';
import { CreateTransferDto } from './transfer.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() transferData: CreateTransferDto): Promise<Transfer> {
    return this.transferService.create(transferData);
  }

  @Get()
  async findAll(): Promise<Transfer[]> {
    return this.transferService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Transfer> {
    return this.transferService.findOne(id);
  }

  @Get('from/:walletId')
  async getOutgoingTransfers(
    @Param('walletId', ParseIntPipe) walletId: number
  ): Promise<Transfer[]> {
    return this.transferService.getOutgoingTransfers(walletId);
  }

  @Get('to/:walletId')
  async getIncomingTransfers(
    @Param('walletId', ParseIntPipe) walletId: number
  ): Promise<Transfer[]> {
    return this.transferService.getIncomingTransfers(walletId);
  }
}