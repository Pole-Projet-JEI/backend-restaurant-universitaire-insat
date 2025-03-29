import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeStamp } from "./timeStamp.abstract";
import { IsInt } from "class-validator";

@Entity()
export class Transfer extends TimeStamp {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  quantity: number;

  @Column({ name: 'sender_wallet_id' })
  @IsInt()
  senderWalletId: number;

  @Column({ name: 'receiver_wallet_id' })
  @IsInt()
  receiverWalletId: number;
}