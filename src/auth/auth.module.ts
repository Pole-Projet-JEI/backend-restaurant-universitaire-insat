import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Student } from "src/typeorm/entities/Users/Student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { QrCode } from "src/typeorm/entities/qrCode.entity";
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student, Wallet, QrCode, RefreshToken])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
