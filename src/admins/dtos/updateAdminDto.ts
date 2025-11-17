import { IsString } from 'class-validator';
import { UpdateUserDto} from '../../users/dtos/updateUserDto';  

export class UpdateAdminDto extends UpdateUserDto {
    @IsString()
    function : string ;

}