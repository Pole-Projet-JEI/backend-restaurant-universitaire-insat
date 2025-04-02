import { IsDate, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { ApiProperty } from '@nestjs/swagger';

export class WeekMenuDto {
  @ApiProperty({})
  @IsDate({ message: 'Invalid start date format.' })
  weekStart: Date;

  @ApiProperty({})
  @IsDate({ message: 'Invalid end date format.' })
  weekEnd: Date;

  @ApiProperty({})
  @IsInt({ message: 'Week number must be an integer.' })
  WeekNumber: number;

  @ApiProperty({})
  @ValidateNested({ each: true })
  @Type(() => DayMenu)
  daysMenues?: DayMenu[];
}
