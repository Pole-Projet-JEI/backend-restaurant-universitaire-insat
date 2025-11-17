import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { entities } from "./typeorm/exportEntities";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { RolesGuard } from "./guards/roles.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { DishModule } from "./dishes/dish.module";
import { DayMenuModule } from "./dayMenus/dayMenu.module";
import { WeekMenuModule } from "./weekMenus/weekMenu.module";
import { OrderModule } from "./orders/order.module";
import { WalletsModule } from './wallets/wallets.module';
import { TicketsModule } from './tickets/tickets.module';
import { TransferModule } from "./transfer/transfer.module";
import { ScanModule } from './scan/scan.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: config.get<string>("JWT_EXPIRATION_TIME"),
        },
      }),
      global: true,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: entities,
        synchronize: true,
        migrations: ["dist/migrations/*{.ts,.js}"],
        cli: {
          migrationsDir: "src/migrations"
        },
      }),
    }),
    AuthModule,
    DishModule,
    DayMenuModule,
    WeekMenuModule,
    OrderModule,
    WalletsModule,
    TicketsModule,
    TransferModule,
    ScanModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard, JwtAuthGuard],
})
export class AppModule {}