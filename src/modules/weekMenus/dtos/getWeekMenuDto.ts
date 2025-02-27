import { IsDateString, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetDayMenuDto } from './GetDayMenuDto'; // Ensure the path is correct


export class GetWeekMenuDto {
  @IsDateString()
  dateDebut: Date;

  @IsDateString()
  dateFin: Date;

  @IsInt()
  @Min(1)
  @Max(52)
  numSemaine: number;

  @ValidateNested({ each: true })
  @Type(() => GetDayMenuDto)
  menusJour: GetDayMenuDto[];
}