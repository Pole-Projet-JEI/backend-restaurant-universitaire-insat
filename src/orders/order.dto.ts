import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum } from 'class-validator';

enum Status {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  DECLINED = 'declined',
}

export class OrderDto {
  @ApiProperty({})
  @IsInt()
  quantity: number;

  @ApiProperty({})
  @IsEnum(Status, { message: 'Invalid status.' })
  status: Status;

  @ApiProperty({})
  @IsInt()
  studentNationalId: number;
}
