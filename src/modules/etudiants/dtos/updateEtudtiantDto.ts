import { IsInt, IsString } from 'class-validator';
import { updateUserDto } from '../../users/dtos/updateUserDto';  



export class updateEtudiantDto extends updateUserDto {
    @IsInt()
    cartEtud?: number;
  
    @IsInt()
    numInscr?: number;
  
    @IsString()
    filiere?: string;
  
    @IsString()
    annee?: string;
  }