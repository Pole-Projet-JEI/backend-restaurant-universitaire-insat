import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketDto } from '../../tickets/dtos/ticketDto';

export class WalletDto {
  @IsInt({ message: 'Wallet ID must be an integer.' })
  id: number;

  @IsInt({ message: 'Ticket balance must be an integer.' })
  ticketBalance: number;

  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets?: TicketDto[];
}
