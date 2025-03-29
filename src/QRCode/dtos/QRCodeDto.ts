import { IsInt, IsString } from "class-validator";

export class UpdateQRCodeDto {
  @IsInt()
  userId?: number;

  @IsString()
  code?: string;
}
