import { IsInt, IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';
import { Major } from '../../typeorm/entities/Users/student.entity';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  registrationNumber?: number;

  @IsOptional()
  @IsEnum(Major, { message: 'Invalid major.' })
  major?: Major;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsInt({ message: 'QrCode ID must be an integer.' })
  qrCodeId?: number;
}
/*
  Note:
  - The passwordHash field is intentionally excluded from the UpdateStudentDto because:
    • It is a sensitive property that should only be changed through a dedicated password update process.
    • Password updates require extra security checks (e.g., verifying the current password, re-hashing, etc.),
      and exposing this field in a generic update endpoint can pose security risks.

  - The wallet field is also excluded because:
    • The wallet is a system-managed resource that is automatically created when a student is registered.
    • It is updated through specific business operations (e.g., deposits, withdrawals) rather than through
      a general profile update, ensuring that all business rules and validations are properly applied.
*/


