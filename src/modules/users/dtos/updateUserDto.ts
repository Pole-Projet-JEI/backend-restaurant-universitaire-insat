import { IsInt, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
export class updateUserDto {
    @IsString()
    nom?: string ;

    @IsString()
    prenom?: string;

    @IsEmail()
    email?: string;

    @IsString()
    @MinLength(8)
    mdpHash?: string;

    @IsEnum(['etudiant', 'superadmin', 'admin'])
    role?: 'etudiant' | 'superadmin' | 'admin';

}