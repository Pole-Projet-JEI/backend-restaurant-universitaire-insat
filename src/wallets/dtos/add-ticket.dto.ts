import { IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketStatus } from 'src/tickets/dtos/ticketDto';

export class AddTicketDto {
  @ApiProperty({
    description: 'The ticket number for the new ticket',
    example: 1001,
  })
  @IsInt()
  ticketNumber: number;

  @ApiProperty({
    description: 'Status of the ticket',
    enum: TicketStatus,
    example: TicketStatus.DORMANT,
  })
  @IsEnum(TicketStatus, { message: 'Invalid status. Allowed values: used, dormant.' })
  status: TicketStatus;
}