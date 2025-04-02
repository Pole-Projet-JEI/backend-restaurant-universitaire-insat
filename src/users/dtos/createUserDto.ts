import { IsInt, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../typeorm/entities/Users/User.abstract'; // Ensure correct import path
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({})
  @IsInt()
  nationalId: number;

  @ApiProperty({})
  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  firstName: string;

  @ApiProperty({})
  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  lastName: string;

  @ApiProperty({})
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @ApiProperty({})
  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  passwordHash: string;

  @ApiProperty({})
  @IsEnum(UserRole, { message: 'Invalid role.' })
  role?: UserRole; 
}
