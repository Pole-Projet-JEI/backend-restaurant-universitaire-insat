import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsEnum, IsOptional } from "class-validator";
import { Type } from "class-transformer";

enum Status {
  ACCEPTED = "accepted",
  WAITING = "waiting",
  DECLINED = "declined",
}

export class OrderDto {
  @ApiProperty({})
  @IsInt()
  quantity: number;

  @ApiProperty({})
  @IsEnum(Status, { message: "Invalid status." })
  status: Status;

  @ApiProperty({})
  @IsInt()
  studentNationalId: number;



}
