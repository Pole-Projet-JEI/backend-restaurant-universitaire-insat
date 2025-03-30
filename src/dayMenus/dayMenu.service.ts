import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';
import { GenericCrudService } from '../generic-crud.service';
import { DayMenuDto } from './dayMenu.dto';

@Injectable()
export class DayMenuService extends GenericCrudService<DayMenu> {
  constructor(
    @InjectRepository(DayMenu)
    private readonly dayMenuRepository: Repository<DayMenu>,

    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>
  ) {
    super(dayMenuRepository);
  }

  private normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0); // Normalizing the date to remove the time
    return normalizedDate;
  }

  async findOne(date: Date): Promise<DayMenu> {
    const normalizedDate = this.normalizeDate(date);

    const dayMenu = await this.dayMenuRepository.findOne({
      where: { date: normalizedDate },
      relations: ['dishes'],
    });

    if (!dayMenu) {
      throw new NotFoundException(`DayMenu not found for date ${normalizedDate.toISOString().split('T')[0]}`);
    }

    return dayMenu;
  }

  async create(data: DayMenuDto): Promise<DayMenu> {
    const { dishes, ...dayMenuData } = data;
    const normalizedDate = this.normalizeDate(dayMenuData.date);

    // Check if a DayMenu already exists for this date
    const existingDayMenu = await this.dayMenuRepository.findOne({
      where: { date: normalizedDate },
    });

    if (existingDayMenu) {
      throw new BadRequestException(`A DayMenu already exists for the date ${normalizedDate.toISOString().split('T')[0]}`);
    }

    const dayMenu = this.dayMenuRepository.create({
      ...dayMenuData,
      date: normalizedDate,
    });

    if (dishes?.length) {
      const dishEntities = await this.dishRepository.findByIds(dishes.map(dish => dish.id));
      if (dishEntities.length !== dishes.length) {
        throw new BadRequestException('Some dishes provided are invalid.');
      }
      dayMenu.dishes = dishEntities;
    }

    return this.dayMenuRepository.save(dayMenu);
  }



  async update(date: Date, data: DayMenuDto): Promise<DayMenu> {
    const normalizedDate = this.normalizeDate(date);
    const dayMenu = await this.findOne(normalizedDate);
  
    // Only update dishes if they're provided
    if (data.dishes?.length) {
      const dishIds = data.dishes.map(d => d.id);
      const existingDishes = await this.dishRepository.findByIds(dishIds);
      
      if (existingDishes.length !== dishIds.length) {
        const missingIds = dishIds.filter(id => !existingDishes.some(d => d.id === id));
        throw new BadRequestException(`Invalid dish IDs: ${missingIds.join(', ')}`);
      }
  
      dayMenu.dishes = existingDishes;
      await this.dayMenuRepository.save(dayMenu);
    }
  
    // Only update other fields if they exist in the request
    const { dishes, ...menuData } = data;
    if (Object.keys(menuData).length > 0) {
      await this.dayMenuRepository.update({ date: normalizedDate }, menuData);
    }
  
    return this.dayMenuRepository.findOne({
      where: { date: normalizedDate },
      relations: ['dishes']
    });
  }

  async delete(date: Date): Promise<void> {
    const normalizedDate = this.normalizeDate(date);
    
    const dayMenu = await this.dayMenuRepository.findOne({ 
      where: { date: normalizedDate } 
    });
    
    if (!dayMenu) {
      throw new NotFoundException(
        `DayMenu not found for date ${normalizedDate.toISOString().split('T')[0]}`
      );
    }

    try {
      await this.dayMenuRepository.manager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager
          .createQueryBuilder()
          .update(Dish)
          .set({ dayMenu: null })
          .where('dayMenu.date = :date', { date: normalizedDate })
          .execute();

        await transactionalEntityManager.delete(DayMenu, { date: normalizedDate });
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete day menu: ' + error.message);
    }
  }
}
