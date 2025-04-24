import { IsInt, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddTicketDto {
  @ApiProperty({
    description: "The ticket number for the new ticket",
    example: 1001,
  })
  @IsInt()
  ticketNumber: number;
}
