import { Expose } from 'class-transformer';

export class returnStudentDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  nationalId: string;
}

