import { IsInt, IsEnum } from 'class-validator';

enum Status {
  USED = 'used',
  DORMANT = 'dormant',
}

export class TicketDto {
  @IsInt()
  id: number; 

  @IsInt()
  ticketNumber: number; 

  @IsEnum(Status, { message: 'Invalid status. Allowed values: used, dormant.' })
  status: Status; 
  
  @IsInt({ message: 'Wallet ID must be an integer.' })
  walletId: number;
}
