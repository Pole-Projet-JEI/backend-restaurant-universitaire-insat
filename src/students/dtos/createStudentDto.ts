import { IsInt, IsEnum, IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

enum Major {
  RT = 'RT',
  GL = 'GL',
  IIA = 'IIA',
  IMI = 'IMI',
  BIO = 'BIO',
  CH = 'CH',
  MPI = 'MPI',
  CBA = 'CBA',
}

export class CreateStudentDto {
  @IsInt()
  nationalId: number;

  @IsString()
  @MinLength(2, { message: 'First name must have at least 2 characters.' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must have at least 2 characters.' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters.' })
  passwordHash: string;

  @IsInt()
  registrationNumber: number;

  @IsEnum(Major, { message: 'Invalid major.' })
  major: Major;

  @IsInt()
  year: number;

  @IsOptional()
  @IsInt({ message: 'Wallet ID must be an integer.' })
  walletId?: number;  // Include wallet reference if needed

  @IsOptional()
  @IsInt({ message: 'QrCode ID must be an integer.' })
  qrCodeId?: number;  // Include QRCode reference if needed
}
