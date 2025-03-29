import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekMenu } from '../typeorm/entities/Restaurant/weekMenu.entity';
import { DayMenu } from '../typeorm/entities/Restaurant/dayMenu.entity';
import { WeekMenuService } from './weekMenu.service';
import { WeekMenuController } from './weekMenu.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeekMenu, DayMenu])
  ],
  controllers: [WeekMenuController],
  providers: [WeekMenuService],
  exports: [WeekMenuService]
})
export class WeekMenuModule {}