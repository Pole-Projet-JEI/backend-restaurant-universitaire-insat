import { IsInt } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  ticketBalance: number;

  @OneToMany(() => Ticket, (ticket) => ticket.wallet)
  tickets: Ticket[];
}
