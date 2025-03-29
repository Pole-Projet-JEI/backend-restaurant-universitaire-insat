import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { DayMenu } from 'src/typeorm/entities/Restaurant/dayMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish,DayMenu])],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
