import { IsDate, IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';

export class DayMenuDto {
  @IsDate()
  date: Date;

  @IsArray()
  @IsOptional()  
  @ArrayNotEmpty()
  dishes: Dish[];
}
