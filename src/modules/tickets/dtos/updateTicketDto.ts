import { IsInt, IsEnum } from 'class-validator';

export class UpdateTicketDto {
    @IsEnum(['utilisé', 'nonUtilisé'])
    statut?: 'utilisé' | 'nonUtilisé';
  }