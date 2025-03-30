import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TimeStamp } from "./timeStamp.abstract";
import { IsEnum, IsInt } from "class-validator";
import { Student } from "./Users/student.entity";

export enum Status {
  ACCEPTED = "accepted",
  WAITING = "waiting",
  DECLINED = "declined",
}

@Entity()
export class Order extends TimeStamp {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  quantity: number;

  @Column({ type: "enum", enum: Status, default: Status.WAITING })
  @IsEnum(Status)
  status: Status;

  @ManyToOne(() => Student, (student) => student.orders)
  student: Student;
}
