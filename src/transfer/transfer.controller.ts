import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from '../typeorm/entities/transfer.entity';
import { TransferDto } from './transfer.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}
    
    @ApiCreatedResponse({ type: Transfer })
    @Post()
    create(@Body() transferData: TransferDto): Promise<Transfer> {
        return this.transferService.create(transferData);
    }
    
    @ApiCreatedResponse({ type: [Transfer] })
    @Get()
    findAll(): Promise<Transfer[]> {
        return this.transferService.getAll();
    }

    //find transfer by its id 
    @ApiCreatedResponse({ type: Transfer })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Transfer> {
        return this.transferService.getById(+id);
    }

    //delete
    @ApiCreatedResponse({ type: Transfer })
    @Post('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.transferService.delete(+id);
    }
    // get received transfers by nationalId
    @ApiCreatedResponse({ type: Transfer })
    @Get('received/:nationalId')
    getReceivedTransfers(@Param('nationalId') nationalId: string): Promise<Transfer[]> {
        return this.transferService.getReceivedTransfers(+nationalId);
    }
    // get sent transfers by nationalId
    @ApiCreatedResponse({ type: Transfer })
    @Get('sent/:nationalId')
    getSentTransfers(@Param('nationalId') nationalId: string): Promise<Transfer[]> {
        return this.transferService.getSentTransfers(+nationalId);
    }

}