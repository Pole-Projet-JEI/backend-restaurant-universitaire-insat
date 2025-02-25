import { IsInt, Min, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @IsInt()
  @Min(0, { message: 'Le nombre des tickets doit être positif.' })
  soldeTicket: number;
}