// src/tickets/ticket.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCrudService } from "src/generic-crud.service";
import { Ticket } from "src/typeorm/entities/ticket.entity";
import { Repository, FindOptionsWhere } from "typeorm";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { TicketDto } from "./dtos/ticketDto";

@Injectable()
export class TicketsService extends GenericCrudService<Ticket> {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>
  ) {
    super(ticketRepository);
  }




  async create(ticketData: TicketDto): Promise<Ticket> {
    const { walletId} = ticketData;
    
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId } as FindOptionsWhere<Wallet>,
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found.`);
    }

    return super.create({
      ticketNumber,
      wallet,
    });
  }

  async update(id: number, ticketData: Partial<TicketDto>): Promise<Ticket> {
    if (ticketData.walletId) {
      const wallet = await this.walletRepository.findOne({
        where: { id: ticketData.walletId } as FindOptionsWhere<Wallet>,
      });

      if (!wallet) {
        throw new NotFoundException(
          `Wallet with ID ${ticketData.walletId} not found.`
        );
      }

      return super.update(id, {
        ...ticketData,
        wallet,
      });
    }

    return super.update(id, ticketData);
  }

  async getTicketsByWallet(walletId: number): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find({
      where: { wallet: { id: walletId } },
      relations: ["wallet"],
      order: { createdAt: "DESC" },
    });

    if (tickets.length === 0) {
      throw new NotFoundException(
        `No tickets found for wallet with ID ${walletId}.`
      );
    }

    return tickets;
  }
}
