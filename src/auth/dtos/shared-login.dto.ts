import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginSharedDto {
  @ApiProperty({})
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsString()
  @Length(6, 250)
  password: string;
}
