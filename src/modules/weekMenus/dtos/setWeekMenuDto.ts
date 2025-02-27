import { IsDateString, IsInt } from 'class-validator';

export class SetWeekMenuDto {
    @IsDateString()
    dateDebut?: Date;
  
    @IsDateString()
    dateFin?: Date;
  
    @IsInt()
    numSemaine?: number;
  }