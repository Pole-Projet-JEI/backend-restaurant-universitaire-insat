import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { GenericCrudService } from '../generic-crud.service';

@Injectable()
export class DishService extends GenericCrudService<Dish> {
  constructor(
    @InjectRepository(Dish)
    protected readonly repository: Repository<Dish>, 
    
    @InjectRepository(DayMenu)
    private readonly dayMenuRepository: Repository<DayMenu> 
  ) {
    super(repository);
  }

  async delete(id: number): Promise<void> {
    // 1. Find the dish with its day menu
    const dish = await this.repository.findOne({
      where: { id },
      relations: ['dayMenu']
    });

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    // 2. Break the relationship with day menu (if exists)
    if (dish.dayMenu) {
      await this.dayMenuRepository
        .createQueryBuilder()
        .relation(DayMenu, 'dishes')
        .of(dish.dayMenu)
        .remove(dish);
    }

    // 3. Delete the dish itself
    await this.repository.delete(id);
  }
}