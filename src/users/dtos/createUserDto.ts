import { IsInt, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../typeorm/entities/Users/User.abstract'; // Ensure correct import path

export class CreateUserDto {
  @IsInt()
  nationalId: number;

  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  passwordHash: string;

  @IsEnum(UserRole, { message: 'Invalid role.' })
  role?: UserRole; 
}