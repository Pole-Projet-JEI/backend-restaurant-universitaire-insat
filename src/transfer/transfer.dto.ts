// transfer.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsPositive, IsNotEmpty, Min } from 'class-validator';

export class TransferDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @Min(1)
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  receiverNationalId: number;

  @IsInt()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  senderNationalId: number;
}