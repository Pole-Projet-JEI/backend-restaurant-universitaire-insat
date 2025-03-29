import { IsDate, IsOptional } from 'class-validator';
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Dish } from './dish.entity';
import { WeekMenu } from './weekMenu.entity';

@Entity()
export class DayMenu {
  @PrimaryColumn({ type: 'date' }) // Specify the type as 'date' to avoid storing time
  @IsDate()
  date: Date;

  @OneToMany(() => Dish, (dish) => dish.dayMenu)
  dishes: Dish[];

  @ManyToOne(() => WeekMenu, (weekMenu) => weekMenu.daysMenues)
  weekMenu: WeekMenu;
}
