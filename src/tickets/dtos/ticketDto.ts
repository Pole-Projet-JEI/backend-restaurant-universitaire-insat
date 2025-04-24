import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsEnum, IsOptional } from "class-validator";

export class TicketDto {
  @ApiProperty({
    description: "The unique ID of the ticket (auto-generated)",
    example: 1,
    required: false,
  })
  @ApiProperty({
    description: "The number assigned to this ticket",
    example: 12345,
  })
  @IsInt()
  @IsOptional()
  ticketNumber?: string;

  @ApiProperty({
    description: "Indicates the number of tickets to create (optional) need for ticket creation",
    example: 5
  })
  numberOfTickets?: number;

  @ApiProperty({
    description: "ID of the wallet associated with this ticket",
    example: 2,
  })
  @IsInt({ message: "Wallet ID must be an integer." })
  walletId: number;


}
