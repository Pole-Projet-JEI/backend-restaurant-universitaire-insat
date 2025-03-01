import { IsDate, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DayMenuDto } from '../../daymenus/dtos/DayMenuDto';

export class WeekMenuDto {
  @IsDate({ message: 'Invalid start date format.' })
  weekStart: Date;

  @IsDate({ message: 'Invalid end date format.' })
  weekEnd: Date;

  @IsInt({ message: 'Week number must be an integer.' })
  numberWeek: number;

  @ValidateNested({ each: true })
  @Type(() => DayMenuDto)
  daysMenues?: DayMenuDto[];
}
