import { IsString } from "class-validator";

export class RefreshToken{
    @IsString()
    token: string; 

}