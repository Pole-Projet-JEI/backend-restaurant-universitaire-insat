import { IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DishDto } from '../../dishes/dtos/DishDto';

export class DayMenuDto {
  @IsDate({ message: 'Invalid date format.' })
  date: Date;

  @ValidateNested({ each: true })
  @Type(() => DishDto)
  @IsOptional()
  dishes?: DishDto[];

  @IsOptional()
  weekMenuId?: number;
}
