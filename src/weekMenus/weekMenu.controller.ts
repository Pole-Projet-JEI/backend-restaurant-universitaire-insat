import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Delete, 
    Query,
    NotFoundException,
    BadRequestException,
    Put
  } from '@nestjs/common';
  import { WeekMenuService } from './weekMenu.service';
  import { WeekMenuDto } from './weekMenu.dto';
import { DeepPartial } from 'typeorm';
import { ApiBadGatewayResponse, ApiCreatedResponse } from '@nestjs/swagger';
  
  @Controller('week-menus')
  export class WeekMenuController {
    constructor(private readonly weekMenuService: WeekMenuService) {}
    
    // create week menu without associated day menus
    @ApiCreatedResponse({})
    @Post()
    async create(@Body() data: WeekMenuDto) {
      try {
        return await this.weekMenuService.create(data);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    // Create week menu with associated day menus
    @ApiCreatedResponse({})
    @Post('with-days')
    async createWithDays(@Body() data: WeekMenuDto) {
      try {
        return await this.weekMenuService.createWithDayMenus(data);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    // Get weekmenu by week number
    @ApiCreatedResponse({})
    @Get(':weekNumber')
    async findByWeekNumber(@Param('weekNumber') weekNumber: string) {
      const result = await this.weekMenuService.findByWeekNumber(parseInt(weekNumber));
      if (!result) {
        throw new NotFoundException(`Week menu ${weekNumber} not found`);
      }
      return result;
    }
  

    // Get all week menus with their associated dishes
    @ApiCreatedResponse({})
    @Get('with-dishes/:weekNumber')  
    async getWeekMenuWithDishes(
    @Param('weekNumber') weekNumber: string  // Kept as string for parsing
    ) {
    const result = await this.weekMenuService.findByWeekNumberWithDishes(
        parseInt(weekNumber)
    );
    if (!result) {
        throw new NotFoundException(`Week menu ${weekNumber} not found`);
    }
    return result;
    }
    
    //update week menu by week number
    @ApiCreatedResponse({})
    @Put(':weekNumber')
    async update(
    @Param('weekNumber') weekNumber: string,
    @Body() data: DeepPartial<WeekMenuDto>
    ) {
    return this.weekMenuService.update(parseInt(weekNumber), data);
    }
    
    // delete week menu by week number
    // Note: This method first finds the week menu by week number and then deletes it using the composite key (weekStart, weekEnd).
    @ApiCreatedResponse({})
    @ApiBadGatewayResponse({})
    @Delete(':weekNumber')
    async delete(@Param('weekNumber') weekNumber: string) {
    try {
        // First find the week menu by week number
        const weekMenu = await this.weekMenuService.findByWeekNumber(parseInt(weekNumber));
        
        if (!weekMenu) {
        throw new NotFoundException(`Week menu ${weekNumber} not found`);
        }

        // Delete using the composite key
        await this.weekMenuService.delete({
        weekStart: weekMenu.weekStart,
        weekEnd: weekMenu.weekEnd
        });

        return { message: `Week menu ${weekNumber} deleted successfully` };
    } catch (error) {
        if (error instanceof NotFoundException) {
        throw error;
        }
        throw new BadRequestException(error.message);
    }
    }
  }