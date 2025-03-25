import { IsInt, IsEnum } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";
import { TimeStamp } from "./timeStamp.abstract";

enum Status {
  USED = "used",
  DORMANT = "dormant",
}

@Entity()
export class Ticket extends TimeStamp {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  ticketNumber: number;

  @Column({ type: "enum", enum: Status, default: Status.DORMANT })
  @IsEnum(Status)
  status: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.tickets)
  wallet: Wallet;
}
