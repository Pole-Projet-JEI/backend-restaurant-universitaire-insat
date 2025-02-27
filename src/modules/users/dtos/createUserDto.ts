import { IsInt, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  CIN: number;

  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères.' })
  nom: string;

  @IsString()
  @MinLength(2, { message: 'Le prénom doit contenir au moins 2 caractères.' })
  prenom: string;

  @IsEmail({}, { message: 'Email invalide.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  mdpHash: string;
}