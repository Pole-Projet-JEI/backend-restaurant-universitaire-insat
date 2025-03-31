import { IsInt, IsEnum, IsEmail, IsString, Length } from "class-validator";
import { UserRole } from "../../typeorm/entities/Users/User.abstract";
import { Major } from "../../typeorm/entities/Users/student.entity";
import { truncate } from "fs";

export class CreateStudentDto {
  @IsInt()
  nationalId: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 250)
  password: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.STUDENT;

  @IsInt()
  registrationNumber: number;

  @IsEnum(Major)
  major: Major;

  @IsInt()
  year: number;
}
