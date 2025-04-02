import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum } from 'class-validator';

enum Status {
  USED = 'used',
  DORMANT = 'dormant',
}

export class TicketDto {
  @ApiProperty({})
  @IsInt()
  id: number; 

  @ApiProperty({})
  @IsInt()
  ticketNumber: number; 

  @ApiProperty({})
  @IsEnum(Status, { message: 'Invalid status. Allowed values: used, dormant.' })
  status: Status; 
  
  @ApiProperty({})
  @IsInt({ message: 'Wallet ID must be an integer.' })
  walletId: number;
}
