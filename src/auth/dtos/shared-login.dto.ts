import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginSharedDto {
  @ApiProperty({
    description: 'User email address',
    example: 'idaniahmed@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'sennaIsLegend163763876187'
  })
  @IsString()
  @Length(6, 250)
  password: string;
}
