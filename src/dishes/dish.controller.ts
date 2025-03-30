import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto, UpdateDishDto } from './dish.dto';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dishService.findOne(id);
  }

  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.dishService.delete(id);
  }
}
