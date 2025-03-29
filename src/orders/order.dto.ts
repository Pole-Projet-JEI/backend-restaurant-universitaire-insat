import { IsInt, IsEnum } from 'class-validator';

enum Status {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  DECLINED = 'declined',
}

export class OrderDto {
  @IsInt()
  quantity: number;

  @IsEnum(Status, { message: 'Invalid status.' })
  status: Status;

  @IsInt()
  studentNationalId: number;
}
