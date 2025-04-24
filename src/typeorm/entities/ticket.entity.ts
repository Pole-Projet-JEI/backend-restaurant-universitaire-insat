import { IsInt } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";
import { TimeStamp } from "./timeStamp.abstract";

@Entity()
export class Ticket extends TimeStamp {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({ unique: true })
  @IsInt()
  ticketNumber: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.tickets)
  wallet: Wallet;
}
