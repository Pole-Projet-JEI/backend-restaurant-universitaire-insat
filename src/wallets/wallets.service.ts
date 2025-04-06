import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCrudService } from "src/generic-crud.service";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { Repository } from "typeorm";
import { AddTicketDto } from "./dtos/add-ticket.dto";
import { Ticket } from "src/typeorm/entities/ticket.entity";
@Injectable()
export class WalletsService extends GenericCrudService<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {
    super(walletRepository);
  }

  async getTickets(walletId: number) {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId },
      relations: ["tickets"],
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found.`);
    }
    return wallet.tickets;
  }

  async addTicketToWallet(
    walletId: number,
    addTicketDto: AddTicketDto
  ): Promise<Ticket> {
    const wallet = await this.repository.findOne({
      where: { id: walletId },
      relations: ["tickets"],
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found.`);
    }

    const ticket = this.ticketRepository.create({
      ...addTicketDto,
      wallet,
    });
    await this.ticketRepository.save(ticket);

    wallet.ticketBalance = (wallet.ticketBalance || 0) + 1;
    await this.repository.save(wallet);

    return ticket;
  }

  async removeTicketFromWallet(walletId: number, ticketId: number): Promise<void> {
    const wallet = await this.repository.findOne({
      where: { id: walletId },
      relations: ['tickets'],
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found.`);
    }

    // Ensure the ticket belongs to this wallet.
    const ticket = wallet.tickets.find(t => t.id === ticketId);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found in wallet ${walletId}.`);
    }

    //deleting the ticket and decreasing the wallet ballance by 1 *_;*
    await this.ticketRepository.delete(ticketId);
    wallet.ticketBalance = Math.max(0, wallet.ticketBalance - 1);
    await this.repository.save(wallet);
  }
}
