// src/wallets/wallets.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { WalletsService } from "./wallets.service";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { WalletDto } from "./dtos/walletDto";

@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() walletDto: WalletDto): Promise<Wallet> {
    return this.walletsService.create(walletDto);
  }

  @Get()
  async findAll(): Promise<Wallet[]> {
    return this.walletsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Wallet> {
    return this.walletsService.findOne(Number(id));
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() walletDto: Partial<WalletDto>
  ): Promise<Wallet> {
    return this.walletsService.update(Number(id), walletDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string): Promise<void> {
    return this.walletsService.delete(Number(id));
  }
}
