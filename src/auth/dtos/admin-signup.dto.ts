import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsEmail, Length } from "class-validator";
import { UserRole } from "src/typeorm/entities/Users/User.abstract";

export class CreateAdminDto {
  @ApiProperty({
    description: "Unique national ID for the admin",
    example: 123456,
  })
  @IsInt()
  nationalId: number;

  @ApiProperty({
    description: "Admin first name",
    example: "Alice",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Admin last name",
    example: "Smith",
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Admin email address",
    example: "admin@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password for the admin account (will be hashed)",
    example: "elMoudirPorFavor_00croissant",
  })
  @IsString()
  @Length(8, 250)
  password: string;

  @ApiProperty({
    description: "Job title for the admin",
    example: "System Administrator",
  })
  @IsString()
  jobTitle: string;

  @ApiProperty({
    description: "Role of the user (defaults to admin)",
    example: UserRole.ADMIN,
    default: UserRole.ADMIN,
  })
  role?: UserRole = UserRole.ADMIN;
}
