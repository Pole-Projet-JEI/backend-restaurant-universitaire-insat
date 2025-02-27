import { IsInt, IsString } from 'class-validator';
import { CreateUserDto} from '../../users/dtos/createUserDto';  // ✅ Corrected path

export class CreateEtudiantDto extends CreateUserDto {
  @IsInt()
  cartEtud: number;

  @IsInt()
  numInscr: number;

  @IsString()
  filiere: string;

  @IsString()
  annee: string;
}
