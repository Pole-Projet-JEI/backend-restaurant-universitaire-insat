import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateQRCodeDto {
  @ApiProperty({})
  @IsInt()
  userId?: number;

  @ApiProperty({})
  @IsString()
  code?: string;
}
