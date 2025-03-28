import { IsInt, IsString, Length, Min, Max, IsOptional } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(10, 255)
  description: string;

  @IsInt()
  @Min(0)
  @Max(5)
  note: number;
}

export class UpdateDishDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(10, 255)
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  note?: number;
}
