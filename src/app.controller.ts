import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/typeorm/entities/Users/User.abstract';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
//if you want to test roles and guards uncomment this 

//   @Get('public')
//   getPublicData() {
//     return { message: 'This route is public, no authentication required!' };
//   }

//   @Get('protected')
//   @UseGuards(JwtAuthGuard)
//   getProtectedData() {
//     return { message: 'You are authenticated!' };
//   }

//   @Get('student')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(UserRole.STUDENT) // Only students can access
//   getStudentData() {
//     return { message: 'You are a student!' };
//   }

//   @Get('admin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(UserRole.ADMIN) // Only admins can access
//   getAdminData() {
//     return { message: 'You are an admin!' };
//   }
 }
