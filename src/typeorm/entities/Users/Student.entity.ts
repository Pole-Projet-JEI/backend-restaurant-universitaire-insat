import { Entity, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { IsEnum, IsInt } from "class-validator";
import { User } from "./User.abstract";
import { Order } from "../order.entity";
import { Wallet } from "../wallet.entity";
import { QrCode } from "../qrCode.entity";

export enum Major {
  RT = "RT",
  GL = "GL",
  IIA = "IIA",
  IMI = "IMI",
  BIO = "BIO",
  CH = "CH",
  MPI = "MPI",
  CBA = "CBA",
}
@Entity()
export class Student extends User {
  @Column({ unique: true })
  @IsInt()
  registrationNumber: number;

  @Column({ type: "enum", enum: Major })
  @IsEnum(Major)
  major: Major;

  @Column()
  @IsInt()
  year: number;

  @OneToMany(() => Order, (order) => order.student)
  orders: Order[];

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @OneToOne(() => QrCode)
  @JoinColumn()
  qrCode: QrCode;
}