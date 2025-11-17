import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { DishService } from "./dish.service";
import { CreateDishDto, UpdateDishDto } from "./dish.dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@ApiTags("dishes")
@Controller("dishes")
export class DishController {
  constructor(private readonly dishService: DishService) {}

  // Create a new dish
  @ApiCreatedResponse({
    description: "Dish created successfully",
    type: CreateDishDto,
  })
  @ApiBadRequestResponse({ description: "Invalid dish data" })
  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  // Retrieve a dish by id
  @ApiOkResponse({
    description: "Dish retrieved successfully",
    type: CreateDishDto,
  })
  @ApiNotFoundResponse({ description: "Dish not found" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.dishService.findOne(id);
  }

  // Retrieve all dishes
  @ApiOkResponse({ description: "List of all dishes", type: [CreateDishDto] })
  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  // Update a dish by id
  @ApiOkResponse({
    description: "Dish updated successfully",
    type: UpdateDishDto,
  })
  @ApiBadRequestResponse({ description: "Invalid update data" })
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  // Delete a dish by id
  @ApiOkResponse({ description: "Dish deleted successfully" })
  @ApiNotFoundResponse({ description: "Dish not found" })
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.dishService.delete(id);
  }
}
