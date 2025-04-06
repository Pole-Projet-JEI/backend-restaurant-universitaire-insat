import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsEnum } from "class-validator";

export enum TicketStatus {
  USED = "used",
  DORMANT = "dormant",
}

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
  ticketNumber: number;

  @ApiProperty({
    description: "Status of the ticket",
    example: TicketStatus.DORMANT,
    enum: TicketStatus,
  })
  @IsEnum(TicketStatus, {
    message: "Invalid status. Allowed values: used, dormant.",
  })
  status: TicketStatus;


  @ApiProperty({
    description: 'ID of the wallet associated with this ticket',
    example: 2,
  })
  @IsInt({ message: 'Wallet ID must be an integer.' })
  walletId: number;
}
