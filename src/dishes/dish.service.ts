import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';
import { GenericCrudService } from '../generic-crud.service';

@Injectable()
export class DishService extends GenericCrudService<Dish> {
  constructor(@InjectRepository(Dish) repository: Repository<Dish>) {
    super(repository);
  }
}
