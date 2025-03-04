import { IsDate } from 'class-validator';
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Dish } from './dish';
import { WeekMenu } from './weekMenu';

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
