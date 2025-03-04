import { IsInt, IsString, Length, Min, Max } from 'class-validator';

export class DishDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(2, 50)
  nom: string;

  @IsString()
  @Length(10, 255)
  description: string;

  @IsInt()
  @Min(0)
  @Max(5)
  note: number;
}
