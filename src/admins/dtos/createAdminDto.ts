import { IsString } from 'class-validator';
import { CreateUserDto} from '../../users/dtos/createUserDto';  

export class CreateAdminDto extends CreateUserDto {
    @IsString()
    function : string ;

}