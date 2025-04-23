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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TicketDto } from "src/tickets/dtos/ticketDto";
import { AddTicketDto } from "./dtos/add-ticket.dto";
import { Ticket } from "src/typeorm/entities/ticket.entity";

@ApiTags("wallets")
@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiCreatedResponse({
    description: "Wallet created successfully",
    type: WalletDto,
  })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() walletDto: WalletDto): Promise<Wallet> {
    return this.walletsService.create(walletDto);
  }

  @Get()
  @ApiOkResponse({ description: "List of wallets", type: [WalletDto] })
  @ApiNotFoundResponse({ description: "No records found." })
  async findAll(): Promise<Wallet[]> {
    return this.walletsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "Wallet found", type: WalletDto })
  @ApiNotFoundResponse({ description: "Wallet not found" })
  async findOne(@Param("id") id: string): Promise<Wallet> {
    return this.walletsService.findOne(Number(id));
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "Wallet updated successfully",
    type: WalletDto,
  })
  @ApiBadRequestResponse({ description: "Invalid update request" })
  async update(
    @Param("id") id: string,
    @Body() walletDto: Partial<WalletDto>
  ): Promise<Wallet> {
    return this.walletsService.update(Number(id), walletDto);
  }

  @Delete(":id")
  @Delete(":id")
  @ApiNoContentResponse({ description: "Wallet deleted successfully" })
  @ApiNotFoundResponse({ description: "Wallet not found" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string): Promise<void> {
    return this.walletsService.delete(Number(id));
  }

  // u will get all tickets associated with a specifi wallet
  @Get(":id/tickets")
  @ApiOkResponse({
    description: "List of tickets for the wallet",
    type: [TicketDto],
  })
  @ApiNotFoundResponse({
    description: "Wallet not found or no tickets available",
  })
  async getTickets(@Param("id") id: string) {
    return this.walletsService.getTickets(Number(id));
  }

  //add a ticket to a wallet and update the wallet's ticket balance
  @Post(":id/add-ticket")
  @ApiCreatedResponse({
    description: "Ticket added to wallet successfully",
    type: Ticket,
  })
  @ApiBadRequestResponse({ description: "Invalid ticket data" })
  @ApiNotFoundResponse({ description: "Wallet not found" })
  @HttpCode(HttpStatus.CREATED)
  async addTicketToWallet(
    @Param("id") id: string,
    @Body() addTicketDto: AddTicketDto
  ): Promise<Ticket> {
    return this.walletsService.addTicketToWallet(Number(id), addTicketDto);
  }

  @Delete(":walletId/tickets/:ticketId")
  @ApiNoContentResponse({
    description: "Tickets removed from wallet successfully",
  })
  @ApiNotFoundResponse({ description: "Wallet or ticket not found" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTicketFromWallet(
    @Param("walletId") walletId: string,
    @Param("ticketId") ticketIds: string //it will be a comma-seperated string (e.g. "1,2,3")
  ): Promise<void> {
    const ticketIdsArray = ticketIds.split(",").map((id) => Number(id));
    return this.walletsService.removeTicketFromWallet(
      Number(walletId),
      ticketIdsArray
    );
  }

  @Delete(":walletId/:numberOfTickets")
  @ApiNoContentResponse({
    description: "Tickets removed from wallet successfully",
  })
  @ApiNotFoundResponse({ description: "Wallet or ticket not found" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFirstNTicketsFromWallet(
    @Param("walletId") walletId: string,
    @Param("numberOfTickets") numberOfTickets: string
  ): Promise<void> {
    const numberOfTicketsToRemove = Number(numberOfTickets);
    return this.walletsService.removeFirstNTickets(
      Number(walletId),
      numberOfTicketsToRemove
    );
  }
}
