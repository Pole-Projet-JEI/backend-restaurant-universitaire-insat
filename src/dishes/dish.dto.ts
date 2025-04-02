import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min, Max, IsOptional } from 'class-validator';

export class CreateDishDto {
  @ApiProperty({})
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({})
  @IsString()
  @Length(10, 255)
  description: string;

  @ApiProperty({})
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  note: number;
}

export class UpdateDishDto {
  @ApiProperty({})
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  @Length(10, 255)
  description?: string;

  @ApiProperty({})
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  note?: number;
}
