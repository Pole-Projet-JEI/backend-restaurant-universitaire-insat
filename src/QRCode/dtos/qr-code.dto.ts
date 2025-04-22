import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

export class UpdateQRCodeDto {
  @ApiProperty({
    description: "The ID of the user associated with the QR code",
    example: 123,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({
    description: "The QR code string",
    example: "QR-123456789",
  })
  @IsString()
  code: string;
}
