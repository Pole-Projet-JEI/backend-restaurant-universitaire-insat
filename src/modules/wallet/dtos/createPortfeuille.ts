import { IsInt, Min } from 'class-validator';

export class CreateWallet {
  @IsInt()
  @Min(0, { message: 'Le nombre des tickets doit être positif.' })
  soldeTicket: number;
}