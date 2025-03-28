import { IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDishDto } from '../../dishes/dish.dto';

export class DayMenuDto {
  @IsDate({ message: 'Invalid date format.' })
  date: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateDishDto)
  @IsOptional()
  dishes?: CreateDishDto[];

  @IsOptional()
  weekMenuId?: number;
}
