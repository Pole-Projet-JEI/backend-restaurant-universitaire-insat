import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length, Min, Max, IsOptional } from "class-validator";

export class CreateDishDto {
  @ApiProperty({
    description: "Name of the dish",
    example: "Spaghetti Bolognese",
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    description: "Detailed description of the dish",
    example: "A classic Italian pasta dish with rich meat sauce.",
  })
  @IsString()
  @Length(10, 255)
  description: string;

  @ApiProperty({
    description: "Note (rating) for the dish (between 0 and 5)",
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  note: number;
}

export class UpdateDishDto {
  @ApiProperty({
    description: "Name of the dish",
    example: "Spaghetti Bolognese",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @ApiProperty({
    description: "Detailed description of the dish",
    example: "A classic Italian pasta dish with rich meat sauce.",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 255)
  description?: string;

  @ApiProperty({
    description: "Note (rating) for the dish (between 0 and 5)",
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  note?: number;
}
