import { IsDate, IsInt } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DayMenu } from './dayMenu';

@Entity()
export class WeekMenu {
  @PrimaryColumn()
  @IsDate()
  weekStart: Date;

  @PrimaryColumn()
  @IsDate()
  weekEnd: Date;

  @Column()
  @IsInt()
  WeekNumber: number;

  @OneToMany(() => DayMenu, (dayMenu) => dayMenu.weekMenu)
  daysMenues: DayMenu[];
}
