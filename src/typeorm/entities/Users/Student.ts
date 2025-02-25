import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { User } from './User';

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
}
