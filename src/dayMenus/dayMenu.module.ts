import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayMenuService } from './dayMenu.service';
import { DayMenuController } from './dayMenu.controller';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity'; // Import the entity
import { Dish } from '../typeorm/entities/Restaurant/dish.entity'; // Import Dish entity

@Module({
  imports: [
    TypeOrmModule.forFeature([DayMenu, Dish]), // Import entities here
  ],
  providers: [DayMenuService],
  controllers: [DayMenuController],
})
export class DayMenuModule {}
