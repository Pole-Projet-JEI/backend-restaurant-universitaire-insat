import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { DayMenuService } from './dayMenu.service';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { DayMenuDto } from './dayMenu.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('day-menus')
export class DayMenuController {
  constructor(private readonly dayMenuService: DayMenuService) {}
  
  @ApiCreatedResponse({})
  @Get(':date')
  async findOne(@Param('date') date: string): Promise<DayMenu> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }
    return this.dayMenuService.findOne(parsedDate);
  }

  @ApiCreatedResponse({})
  @Post()
  async create(@Body() data: DayMenuDto): Promise<DayMenu> {
    return this.dayMenuService.create(data);
  }

  @ApiCreatedResponse({})
  @Put(':date')
  async update(
    @Param('date') date: string,
    @Body() data: DayMenuDto,
  ): Promise<DayMenu> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return this.dayMenuService.update(parsedDate, data);
  }

  @ApiCreatedResponse({})
  @Delete(':date')
  async delete(@Param('date') date: string): Promise<{ message: string }> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    await this.dayMenuService.delete(parsedDate);
    return { message: `DayMenu successfully deleted for date ${date}` };
  }
}
