import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TicketDto } from '../../tickets/dtos/ticketDto';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({
    description: 'The auto-generated ID of the wallet',
    example: 1,
    required: false,
  })
  @ApiProperty({})
  @IsInt({ message: 'Wallet ID must be an integer.' })
  id?: number;

  @ApiProperty({
    description: 'The ticket balance of the wallet',
    example: 23,
  })
  @IsInt({ message: 'Ticket balance must be an integer.' })
  ticketBalance: number;

  @ApiProperty({
    description: 'Array of tickets associated with the wallet',
    type: [TicketDto],
    required: false,
  })
  @ApiProperty({})
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets?: TicketDto[];
}
