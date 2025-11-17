import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCrudService } from "src/generic-crud.service";
import { Wallet } from "src/typeorm/entities/wallet.entity";
import { Repository } from "typeorm";
import { AddTicketDto } from "./dtos/add-ticket.dto";
import { Ticket } from "src/typeorm/entities/ticket.entity";
import { Student } from "src/typeorm/entities/Users/Student.entity";
@Injectable()
export class WalletsService extends GenericCrudService<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {
    super(walletRepository);
  }
  async getWalletByStudentCIN(cin: number) {
    const student = await this.studentRepository.findOne({
      where: {
        nationalId: cin,
      },
      relations: ["wallet"],
    });
    if (!student) {
      throw new NotFoundException(`Student with CIN ${cin} not found.`);
    }
    const wallet = student.wallet;
    if (!wallet) {
      throw new NotFoundException(
        `Wallet for student with CIN ${cin} not found.`
      );
    }
    return wallet;
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

  async removeTicketFromWallet( //think of hajaa generique
    walletId: number,
    ticketId: Array<number>
  ): Promise<void> {
    const wallet = await this.repository.findOne({
      where: { id: walletId },
      relations: ["tickets"],
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found.`);
    }

    for (const id of ticketId) {
      const ticket = wallet.tickets.find((t) => t.id === id);
      if (!ticket) {
        throw new NotFoundException(
          `Ticket with ID ${id} not found in wallet ${walletId}.`
        );
      }
      await this.ticketRepository.delete(id);
      wallet.ticketBalance = Math.max(0, wallet.ticketBalance - 1);
    }
    await this.repository.save(wallet);
  }
  async removeFirstNTickets(walletId: number, n: number): Promise<void> {
    const tickets = await this.ticketRepository.find({
      where: { wallet: { id: walletId } },
      relations: ["wallet"],
      take: n,
    });

    if (tickets.length === 0) {
      throw new NotFoundException(
        `No tickets found for wallet with ID ${walletId}.`
      );
    }
    for (const ticket of tickets) {
      await this.ticketRepository.delete(ticket.id);
    }
  }
  async removeFirstNTicketsWithCIN(cin: number, n: number): Promise<void> {
    const wallet = await this.getWalletByStudentCIN(cin);

    await this.removeFirstNTickets(wallet.id, n);
  }
}
