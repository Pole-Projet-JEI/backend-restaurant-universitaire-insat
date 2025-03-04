import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { UpdateUserDto } from '../../users/dtos/updateUserDto';  // ✅ Corrected path

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

export class UpdateStudentDto extends UpdateUserDto {
  @IsInt()
  @IsOptional()
  registrationNumber?: number;

  @IsEnum(Major, { message: 'Invalid major.' })
  @IsOptional()
  major?: Major;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsInt({ message: 'QrCode ID must be an integer.' })
  @IsOptional()
  qrCodeId?: number; 
}
