import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { User } from './User';
import { Command } from '../command';

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
}
