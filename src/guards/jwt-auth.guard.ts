import { Injectable,ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Admin } from "../typeorm/entities/Users/Admin.entity";
import { SuperAdmin } from "../typeorm/entities/Users/superAdmin.entity";
import { Student } from "../typeorm/entities/Users/Student.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest<TUser = Admin | SuperAdmin | Student>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log('Error:', err);
    console.log('User:', user);
    console.log('Info:', info);
  
    if (err || !user) {
      throw err || new UnauthorizedException('Authentication required');
    }
    return user;
  }
}
