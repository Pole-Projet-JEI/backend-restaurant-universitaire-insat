import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsEmail, Length } from "class-validator";
import { UserRole } from "src/typeorm/entities/Users/User.abstract";

export class CreateAdminDto {
  @ApiProperty({})
  @IsInt()
  nationalId: number;

  @ApiProperty({})
  @IsString()
  firstName: string;

  @ApiProperty({})
  @IsString()
  lastName: string;

  @ApiProperty({})
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsString()
  @Length(6, 250)
  passwordHash: string;

  @ApiProperty({})
  @IsString()
  jobTitle: string;

  // Optionally, if you want to include the role explicitly:
  // It defaults to admin. In many cases, this field may be set automatically.
  role?: UserRole = UserRole.ADMIN;
}
