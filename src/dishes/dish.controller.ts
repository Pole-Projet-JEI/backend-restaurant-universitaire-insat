import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto, UpdateDishDto } from './dish.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @ApiCreatedResponse({})
  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @ApiCreatedResponse({})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dishService.findOne(id);
  }

  @ApiCreatedResponse({})
  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @ApiCreatedResponse({})
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  @ApiCreatedResponse({})
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.dishService.delete(id);
  }
}
