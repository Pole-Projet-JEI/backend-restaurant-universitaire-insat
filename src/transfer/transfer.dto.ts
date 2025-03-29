import {IsInt,Min} from "class-validator" ;

export class CreateTransferDto {
    @IsInt()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity: number;
    
    @IsInt()
    senderNationalId: number;
    
    @IsInt()
    receiverNationalId: number;
    }

export class UpdateTransferDto {
    @IsInt()
    quantity: number;
}
   
