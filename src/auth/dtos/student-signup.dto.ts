import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsEmail,
  Length,
  MinLength,
  IsEnum,
} from "class-validator";
import { Major } from "src/typeorm/entities/Users/Student.entity";
import { UserRole } from "src/typeorm/entities/Users/User.abstract";

export class CreateStudentDto {
  @ApiProperty({
    description: "Unique national ID for the student",
    example: 987654,
  })
  @IsInt()
  nationalId: number;

  @ApiProperty({
    description: "Student first name",
    example: "Bob",
  })
  @IsString()
  @MinLength(2, { message: "First name must have at least 2 characters." })
  firstName: string;

  @ApiProperty({
    description: "Student last name",
    example: "Johnson",
  })
  @IsString()
  @MinLength(2, { message: "Last name must have at least 2 characters." })
  lastName: string;

  @ApiProperty({
    description: "Student email address",
    example: "student@example.com",
  })
  @IsEmail({}, { message: "Invalid email." })
  email: string;

  @ApiProperty({
    description: "Password for the student account (will be hashed)",
    example: "StrongPassword123",
  })
  @IsString()
  @MinLength(8, { message: "Password must have at least 8 characters." })
  passwordHash: string;

  @ApiProperty({
    description: "Registration number for the student",
    example: 2021001,
  })
  @IsInt()
  registrationNumber: number;

  @ApiProperty({
    description: "Major of the student",
    example: Major.GL,
    enum: Major,
  })
  @IsEnum(Major, { message: "Invalid major." })
  major: Major;

  @ApiProperty({
    description: "Year of study for the student",
    example: 1,
  })
  @IsInt()
  year: number;

  @ApiProperty({
    description: "Role of the user (defaults to student)",
    example: UserRole.STUDENT,
    default: UserRole.STUDENT,
  })
  role?: UserRole = UserRole.STUDENT;
}
