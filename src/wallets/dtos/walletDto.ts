import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketDto } from '../../tickets/dtos/ticketDto';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({})
  @IsInt({ message: 'Wallet ID must be an integer.' })
  id: number;

  @ApiProperty({})
  @IsInt({ message: 'Ticket balance must be an integer.' })
  ticketBalance: number;

  @ApiProperty({})
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets?: TicketDto[];
}
