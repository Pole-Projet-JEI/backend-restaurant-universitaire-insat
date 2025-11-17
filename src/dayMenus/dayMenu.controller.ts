import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  HttpCode, 
  HttpStatus, 
  BadRequestException 
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { DayMenuService } from './dayMenu.service';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { DayMenuDto } from './dayMenu.dto';

@ApiTags('day-menus')
@Controller('day-menus')
export class DayMenuController {
  constructor(private readonly dayMenuService: DayMenuService) {}

  @Get(':date')
  @ApiOkResponse({ description: 'Day menu retrieved successfully', type: DayMenuDto })
  @ApiNotFoundResponse({ description: 'Day menu not found for the provided date' })
  @ApiBadRequestResponse({ description: 'Invalid date format. Use YYYY-MM-DD' })
  async findOne(@Param('date') date: string): Promise<DayMenu> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }
    return this.dayMenuService.findOne(parsedDate);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Day menu created successfully', type: DayMenuDto })
  @ApiBadRequestResponse({ description: 'Invalid day menu data' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: DayMenuDto): Promise<DayMenu> {
    return this.dayMenuService.create(data);
  }

  @Put(':date')
  @ApiOkResponse({ description: 'Day menu updated successfully', type: DayMenuDto })
  @ApiBadRequestResponse({ description: 'Invalid update data or date format' })
  async update(@Param('date') date: string, @Body() data: DayMenuDto): Promise<DayMenu> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return this.dayMenuService.update(parsedDate, data);
  }

  @Delete(':date')
  @ApiNoContentResponse({ description: 'Day menu deleted successfully' })
  @ApiNotFoundResponse({ description: 'Day menu not found for the provided date' })
  @ApiBadRequestResponse({ description: 'Invalid date format' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('date') date: string): Promise<{ message: string }> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    await this.dayMenuService.delete(parsedDate);
    return { message: `DayMenu successfully deleted for date ${date}` };
  }
}
