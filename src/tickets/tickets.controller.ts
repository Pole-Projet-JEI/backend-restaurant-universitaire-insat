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
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { Ticket } from 'src/typeorm/entities/ticket.entity';
import { TicketDto } from './dtos/ticketDto';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Ticket created successfully', type: TicketDto })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() ticketDto: TicketDto): Promise<Ticket[]> {
    return this.ticketsService.createTickets(ticketDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of all tickets', type: [TicketDto] })
  @ApiNotFoundResponse({ description: 'No tickets found' })
  async findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Ticket found', type: TicketDto })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  async findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Ticket updated successfully', type: TicketDto })
  @ApiBadRequestResponse({ description: 'Invalid update data' })
  async update(@Param('id') id: string, @Body() updateTicketDto: Partial<TicketDto>): Promise<Ticket> {
    return this.ticketsService.update(Number(id), updateTicketDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Ticket deleted successfully' })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.ticketsService.delete(Number(id));
  }

  @Get('wallet/:walletId')
  @ApiOkResponse({ description: 'Tickets for a specific wallet', type: [TicketDto] })
  @ApiNotFoundResponse({ description: 'No tickets found for the given wallet ID' })
  async getTicketsByWallet(@Param('walletId') walletId: string): Promise<Ticket[]> {
    return this.ticketsService.getTicketsByWallet(Number(walletId));
  }
}
