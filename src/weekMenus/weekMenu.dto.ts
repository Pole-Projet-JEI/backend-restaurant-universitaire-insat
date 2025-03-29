import { IsDate, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';

export class WeekMenuDto {
  @IsDate({ message: 'Invalid start date format.' })
  weekStart: Date;

  @IsDate({ message: 'Invalid end date format.' })
  weekEnd: Date;

  @IsInt({ message: 'Week number must be an integer.' })
  WeekNumber: number;

  @ValidateNested({ each: true })
  @Type(() => DayMenu)
  daysMenues?: DayMenu[];
}
