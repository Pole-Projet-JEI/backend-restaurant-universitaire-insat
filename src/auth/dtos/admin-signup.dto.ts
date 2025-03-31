import { IsInt, IsString, IsEmail, Length } from "class-validator";
import { UserRole } from "src/typeorm/entities/Users/User.abstract";

export class CreateAdminDto {
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
  passwordHash: string;

  @IsString()
  jobTitle: string;

  // Optionally, if you want to include the role explicitly:
  // It defaults to admin. In many cases, this field may be set automatically.
  role?: UserRole = UserRole.ADMIN;
}
