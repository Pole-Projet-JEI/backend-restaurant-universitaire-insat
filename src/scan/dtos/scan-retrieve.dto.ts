import { IsInt, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class ScanRetrieveDto {
  @IsNotEmpty({ message: "CIN is required." })
  @IsInt({ message: "CIN must be a number." })
  studenNationalId: number;
}
