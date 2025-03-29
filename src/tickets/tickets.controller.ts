// src/tickets/tickets.controller.ts
import { 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Delete, 
    Body, 
    Param, 
    HttpCode, 
    HttpStatus 
  } from '@nestjs/common';
  import { TicketsService } from './tickets.service';
  import { Ticket } from 'src/typeorm/entities/ticket.entity';
  import { TicketDto } from './dtos/ticketDto';
  
  @Controller('tickets')
  export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() ticketDto: TicketDto): Promise<Ticket> {
      return this.ticketsService.create(ticketDto);
    }
  
    @Get()
    async findAll(): Promise<Ticket[]> {
      return this.ticketsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Ticket> {
      return this.ticketsService.findOne(Number(id));
    }

    @Patch(':id')
    async update(
      @Param('id') id: string, 
      @Body() updateTicketDto: Partial<TicketDto>
    ): Promise<Ticket> {
      return this.ticketsService.update(Number(id), updateTicketDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
      return this.ticketsService.delete(Number(id));
    }
  
    @Get('wallet/:walletId')
    async getTicketsByWallet(@Param('walletId') walletId: string): Promise<Ticket[]> {
      return this.ticketsService.getTicketsByWallet(Number(walletId));
    }
  }
  