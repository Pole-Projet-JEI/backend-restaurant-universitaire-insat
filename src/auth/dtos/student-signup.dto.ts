import {
  IsInt,
  IsEnum,
  IsEmail,
  IsString,
  Length,
  IsOptional,
  MinLength,
} from "class-validator";
import { Major } from "../../typeorm/entities/Users/student.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @ApiProperty({})
  @IsInt()
  nationalId: number;

  @ApiProperty({})
  @IsString()
  @MinLength(2, { message: "First name must have at least 2 characters." })
  firstName: string;

  @ApiProperty({})
  @IsString()
  @MinLength(2, { message: "Last name must have at least 2 characters." })
  lastName: string;

  @ApiProperty({})
  @IsEmail({}, { message: "Invalid email." })
  email: string;

  @ApiProperty({})
  @IsString()
  @MinLength(8, { message: "Password must have at least 8 characters." })
  passwordHash: string;

  @ApiProperty({})
  @IsInt()
  registrationNumber: number;

  @ApiProperty({})
  @IsEnum(Major, { message: "Invalid major." })
  major: Major;

  @ApiProperty({})
  @IsInt()
  year: number;

  @ApiProperty({})
  @IsOptional()
  @IsInt({ message: "Wallet ID must be an integer." })
  walletId?: number; // Include wallet reference if needed

  @ApiProperty({})
  @IsOptional()
  @IsInt({ message: "QrCode ID must be an integer." })
  qrCodeId?: number; // Include QRCode reference if needed
}
