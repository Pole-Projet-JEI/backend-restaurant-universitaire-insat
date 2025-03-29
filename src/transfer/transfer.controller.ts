import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from '../typeorm/entities/transfer.entity';
import { CreateTransferDto } from './transfer.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  create(@Body() transferData: CreateTransferDto): Promise<Transfer> {
    return this.transferService.create(transferData);
  }

  @Get()
  findAll(): Promise<Transfer[]> {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transfer> {
    return this.transferService.findOne(+id);
  }

  @Get('student/:nationalId')
  getByStudent(@Param('nationalId') nationalId: string): Promise<Transfer[]> {
    return this.transferService.getTransfersByStudent(+nationalId);
  }
}