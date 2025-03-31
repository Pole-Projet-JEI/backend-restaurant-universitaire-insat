import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { Student } from "src/typeorm/entities/Users/student.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Wallet } from "src/typeorm/entities/wallet.entity"
import { QrCode } from "src/typeorm/entities/qrCode.entity"
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"


@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Wallet, QrCode, RefreshToken])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

