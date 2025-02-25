import { Entity, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { User } from './User';
import { Command } from '../command';
import { Wallet } from '../wallet';
import { QrCode } from '../qrCode';

@Entity()
export class Student extends User {
  @Column()
  @IsInt()
  registrationNumber: number;

  @Column()
  @IsString()
  major: string;

  @Column()
  @IsInt()
  year: number;

  @OneToMany(() => Command, (command) => command.student)
  commands: Command[];

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @OneToOne(() => QrCode)
  @JoinColumn()
  qrCode: QrCode;
}
