import { IsDate, IsInt } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DayMenu } from "./dayMenu.entity";

@Entity()
export class WeekMenu {
  @PrimaryColumn({type: 'date'})
  @IsDate()
  weekStart: Date;

  @PrimaryColumn({type: 'date'})
  @IsDate()
  weekEnd: Date;

  @Column()
  @IsInt()
  WeekNumber: number;

  @OneToMany(() => DayMenu, (dayMenu) => dayMenu.weekMenu)
  daysMenues: DayMenu[];
}
