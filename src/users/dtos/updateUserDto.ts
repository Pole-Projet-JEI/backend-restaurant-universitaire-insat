import { IsInt, IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../typeorm/entities/Users/User'; 

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address.' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  passwordHash?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid role.' })
  role?: UserRole;
}
