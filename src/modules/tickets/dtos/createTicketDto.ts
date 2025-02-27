import { IsInt, IsEnum } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  numero: number;

  @IsEnum(['utilisé', 'nonUtilisé'], { message: 'Statut invalide.' })
  statut: 'utilisé' | 'nonUtilisé';
}