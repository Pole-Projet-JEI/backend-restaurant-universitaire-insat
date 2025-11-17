import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServiceStudent } from "./auth.service.student";
import { AuthServiceAdmin } from "./auth.service.admin";
import { Student } from "src/typeorm/entities/Users/Student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity";
import { Admin } from "src/typeorm/entities/Users/Admin.entity";
import { WalletsModule } from "src/wallets/wallets.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Wallet, RefreshToken, Admin]),
    WalletsModule,
  ],
  controllers: [AuthController],
  providers: [AuthServiceStudent, AuthServiceAdmin],
})
export class AuthModule {}
