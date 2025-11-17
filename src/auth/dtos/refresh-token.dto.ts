import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshToken{
    @ApiProperty({
        description: 'The refresh token string',
      })
    @IsString()
    token: string; 

}