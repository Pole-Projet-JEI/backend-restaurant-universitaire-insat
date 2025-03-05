import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { Student } from "src/typeorm/entities/Users/Student.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Wallet } from "src/typeorm/entities/wallet.entity"
import { QrCode } from "src/typeorm/entities/qrCode.entity"
import { RefreshToken } from "src/typeorm/entities/RefreshToken/refreshToken.entity"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Wallet, QrCode, RefreshToken]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

