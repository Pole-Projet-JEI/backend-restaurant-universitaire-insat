import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from '../typeorm/entities/Restaurant/dish.entity';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
