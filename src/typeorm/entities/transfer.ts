import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from './timeStamp';
import { IsInt } from 'class-validator';
import { Student } from './Users/Student';

@Entity()
export class Transfert extends TimeStamp {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  quantity: number;

  @OneToOne(() => Student)
  @JoinColumn()
  receiver: Student;

  @OneToOne(() => Student)
  @JoinColumn()
  sender: Student;
}
