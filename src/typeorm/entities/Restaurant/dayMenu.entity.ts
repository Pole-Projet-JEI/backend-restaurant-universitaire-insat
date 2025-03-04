import { IsDate } from "class-validator";
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Dish } from "./dish.entity";
import { WeekMenu } from "./weekMenu.entity";

@Entity()
export class DayMenu {
  @PrimaryColumn()
  @IsDate()
  date: Date;

  @OneToMany(() => Dish, (dish) => dish.dayMenu)
  dishes: Dish[];

  @ManyToOne(() => WeekMenu, (weekMenu) => weekMenu.daysMenues)
  weekMenu: WeekMenu;
}
