import { IsInt, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayMenu } from './dayMenu';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsInt()
  note: number;

  @ManyToOne(() => DayMenu, (dayMenu) => dayMenu.dishes)
  dayMenu: DayMenu;
}
