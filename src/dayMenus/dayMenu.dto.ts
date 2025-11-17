import { IsDate, IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DayMenuDto {
  @ApiProperty({})
  @IsDate()
  date: Date;

  @ApiProperty({})
  @IsArray()
  @IsOptional()  
  @ArrayNotEmpty()
  dishes: Dish[];
}
