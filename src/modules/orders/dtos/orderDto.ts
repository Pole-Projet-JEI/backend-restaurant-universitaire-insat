import { IsInt, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  quantite: number;

  @IsEnum(['accepted', 'enCours', 'annule'], { message: 'Statut invalide.' })
  statut: 'accepted' | 'enCours' | 'annule';

  @IsInt()
  total_point: number;
}