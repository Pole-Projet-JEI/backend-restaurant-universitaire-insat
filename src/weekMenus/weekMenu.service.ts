import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { WeekMenu } from '../typeorm/entities/Restaurant/weekMenu.entity';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { GenericCrudService } from '../generic-crud.service';
import { WeekMenuDto } from './weekMenu.dto';

@Injectable()
export class WeekMenuService extends GenericCrudService<WeekMenu> {
  constructor(
    @InjectRepository(WeekMenu)
    protected readonly repository: Repository<WeekMenu>,
    
    @InjectRepository(DayMenu)
    private readonly dayMenuRepository: Repository<DayMenu>
  ) {
    super(repository);
  }

  private toDateOnly(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }



 async createWithDayMenus(data: WeekMenuDto): Promise<WeekMenu> {
  const parseDate = (date: string | Date): Date => {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new BadRequestException('Invalid date format');
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const weekStart = parseDate(data.weekStart);
  const weekEnd = parseDate(data.weekEnd);

  if ((weekEnd.getTime() - weekStart.getTime()) / (1000 * 3600 * 24) !== 6) {
    throw new BadRequestException('Week must span exactly 7 days');
  }

  return this.repository.manager.transaction(async (manager) => {
    // Explicitly type the saved weekMenu
    const weekMenu = await manager.save(WeekMenu, {
      weekStart,
      weekEnd,
      WeekNumber: data.WeekNumber
    }) as WeekMenu; // Type assertion here

    await manager.save(DayMenu, 
      Array.from({ length: 5 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        return { date, weekMenu };
      })
    );

    return manager.findOne(WeekMenu, { 
        where: { 
          weekStart: weekMenu.weekStart,
          weekEnd: weekMenu.weekEnd
        },
        relations: ['daysMenues'] 
      });
  });
}


  async findByWeekNumber(weekNumber: number): Promise<WeekMenu> {
    return this.repository.findOne({ 
      where: { WeekNumber: weekNumber },
      relations: ['daysMenues']
    });
  }


  async findByDate(date: Date): Promise<WeekMenu> {
    const dateOnly = this.toDateOnly(date);
    return this.repository
      .createQueryBuilder('weekMenu')
      .where(':date BETWEEN weekMenu.weekStart AND weekMenu.weekEnd', { 
        date: dateOnly 
      })
      .leftJoinAndSelect('weekMenu.daysMenues', 'dayMenu')
      .getOne();
  }

  async findByWeekNumberWithDishes(weekNumber: number): Promise<WeekMenu> {
    return this.repository.findOne({
      where: { WeekNumber: weekNumber },
      relations: {
        daysMenues: {
          dishes: true // This loads the dishes for each day menu
        }
      },
      // Optional: add sorting by date
      order: {
        daysMenues: {
          date: "ASC" // Sorts days from Monday to Friday
        }
      }
    });
  }

  async update(
    weekNumber: number, 
    data: DeepPartial<WeekMenu>
  ): Promise<WeekMenu> {
    // 1. Find by week number (our lookup key)
    const existing = await this.findByWeekNumber(weekNumber);
    if (!existing) {
      throw new NotFoundException(`Week menu ${weekNumber} not found`);
    }
  
    // 2. Block primary key updates
    if (data.weekStart || data.weekEnd) {
      throw new BadRequestException('Cannot modify week dates after creation');
    }
  
    // 3. Only allow WeekNumber updates
    if (data.WeekNumber) {
      existing.WeekNumber = data.WeekNumber;
    }
  
    // 4. Save and return
    return this.repository.save(existing);
  }






  //delete
  async delete(where: { weekStart: Date; weekEnd: Date }): Promise<void> {
    await this.repository.delete(where);
  }


}