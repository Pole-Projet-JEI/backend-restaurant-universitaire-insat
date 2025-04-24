// src/tickets/ticket.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCrudService } from "src/generic-crud.service";
import { Ticket } from "src/typeorm/entities/ticket.entity";
import { Repository, FindOptionsWhere, EntityManager } from "typeorm";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { TicketDto } from "./dtos/ticketDto";
import { generateRandomTicketNumber } from "src/utils/generate-ticket-number.helper";

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

  async createTickets(
    ticketData: TicketDto,
    transactionalEntityManager?: EntityManager
  ): Promise<Ticket[]> {
    const { walletId } = ticketData;

    const wallet = await this.walletRepository.findOne({
      where: { id: walletId } as FindOptionsWhere<Wallet>,
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found.`);
    }

    const tickets = Array.from(
      { length: ticketData.numberOfTickets || 1 },
      () => {
        const ticketNumber = generateRandomTicketNumber();
        return transactionalEntityManager.create(Ticket, {
          ticketNumber,
          wallet,
        });
      }
    );
    return transactionalEntityManager.save(tickets);
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
