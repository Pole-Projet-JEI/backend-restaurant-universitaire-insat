import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TimeStamp } from "./timeStamp.abstract";
import { IsInt } from "class-validator";
import { Student } from "./Users/student.entity";

@Entity()
export class Transfer extends TimeStamp {
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
