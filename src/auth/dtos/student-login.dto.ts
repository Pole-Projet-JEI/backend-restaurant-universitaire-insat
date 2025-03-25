import { IsEmail, IsString, Length } from 'class-validator';

export class LoginStudentDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 250)
  password: string;
}
