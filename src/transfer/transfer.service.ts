import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCrudService } from "src/generic-crud.service";
import { Transfer } from "../typeorm/entities/transfer.entity";
import { Wallet } from "../typeorm/entities/wallet.entity";
import { Student } from "../typeorm/entities/Users/Student.entity";
import { Repository, FindOptionsWhere } from "typeorm";
import { TransferDto } from "./transfer.dto";
import { plainToInstance } from "class-transformer";
import { returnStudentDto } from "../users/dtos/returnStudentDto";
import { TicketsService } from "../tickets/tickets.service";
import { Ticket } from "../typeorm/entities/ticket.entity";

@Injectable()
export class TransferService extends GenericCrudService<Transfer> {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly ticketsService: TicketsService
  ) {
    super(transferRepository);
  }

  private mapTransferStudent(transfer: Transfer): Transfer {
    if (transfer?.receiver) {
      transfer.receiver = plainToInstance(returnStudentDto, transfer.receiver, {
        excludeExtraneousValues: true,
      }) as unknown as Student;
    }
    if (transfer?.sender) {
      transfer.sender = plainToInstance(returnStudentDto, transfer.sender, {
        excludeExtraneousValues: true,
      }) as unknown as Student;
    }
    return transfer;
  }

  async create(transferData: TransferDto): Promise<Transfer> {
    const { senderNationalId, receiverNationalId, quantity } = transferData;
    
    if (senderNationalId === receiverNationalId) {
      throw new BadRequestException('Sender and receiver cannot be the same student');
    }

    // Find the sender with their wallet
    const sender = await this.studentRepository.findOne({ 
      where: { nationalId: senderNationalId } as FindOptionsWhere<Student>,
      relations: ['wallet']
    });
    
    if (!sender) {
      throw new NotFoundException(`Sender with nationalId ${senderNationalId} not found`);
    }

    // Find the receiver with their wallet
    const receiver = await this.studentRepository.findOne({ 
      where: { nationalId: receiverNationalId } as FindOptionsWhere<Student>,
      relations: ['wallet'] 
    });
    
    if (!receiver) {
      throw new NotFoundException(`Receiver with nationalId ${receiverNationalId} not found`);
    }

    // Check if sender has enough tickets
    if (sender.wallet.ticketBalance < quantity) {
      throw new BadRequestException('Insufficient ticket balance for transfer');
    }

    // Get available tickets from sender's wallet
    const senderTickets = await this.ticketRepository.find({
      where: { wallet: { id: sender.wallet.id } },
      take: quantity,
      order: { createdAt: 'ASC' } // Transfer oldest tickets first
    });

    if (senderTickets.length < quantity) {
      throw new BadRequestException(`Only ${senderTickets.length} tickets available but trying to transfer ${quantity}`);
    }

    // Update ticket ownership
    for (const ticket of senderTickets) {
      ticket.wallet = receiver.wallet;
      await this.ticketRepository.save(ticket);
    }

    // Update wallet balances
    sender.wallet.ticketBalance -= quantity;
    receiver.wallet.ticketBalance += quantity;

    // Save wallet changes
    await this.walletRepository.save(sender.wallet);
    await this.walletRepository.save(receiver.wallet);

    // Create and save the transfer record
    const transfer = this.transferRepository.create({
      quantity,
      sender,
      receiver
    });

    transfer.createdAt = new Date();
    
    await this.transferRepository.save(transfer);

    return this.mapTransferStudent(transfer);
  }

  async getAll(): Promise<Transfer[]> {
    const transfers = await this.transferRepository.find({
      relations: ['receiver', 'sender'],
      order: { createdAt: 'DESC' },
    });
    
    return transfers.map(transfer => this.mapTransferStudent(transfer));
  }

  async getById(id: number): Promise<Transfer> {
    const transfer = await this.transferRepository.findOne({
      where: { id },
      relations: ['receiver', 'sender'],
    });
    
    if (!transfer) {
      throw new NotFoundException(`Transfer with id ${id} not found`);
    }
    
    return this.mapTransferStudent(transfer);
  }

  async update(id: number, transferData: Partial<TransferDto>): Promise<Transfer> {
    const transfer = await this.transferRepository.findOne({
      where: { id },
      relations: ['receiver', 'sender'],
    });
    
    if (!transfer) {
      throw new NotFoundException(`Transfer with id ${id} not found`);
    }

    // Update the transfer record
    Object.assign(transfer, transferData);
    transfer.updatedAt = new Date();
    
    await this.transferRepository.save(transfer);
    
    return this.mapTransferStudent(transfer);
  }

  async delete(id: number): Promise<void> {
    const transfer = await this.transferRepository.findOne({ 
      where: { id },
      relations: ['receiver', 'sender', 'receiver.wallet', 'sender.wallet']
    });
    
    if (!transfer) {
      throw new NotFoundException(`Transfer with id ${id} not found`);
    }

    // Get the transferred tickets from receiver's wallet (newest tickets equal to the transfer quantity)
    const receiverTickets = await this.ticketRepository.find({
      where: { wallet: { id: transfer.receiver.wallet.id } },
      take: transfer.quantity,
      order: { createdAt: 'DESC' } // Get the most recently transferred tickets
    });

    if (receiverTickets.length < transfer.quantity) {
      throw new BadRequestException(`Cannot reverse transfer - receiver only has ${receiverTickets.length} tickets`);
    }

    // Transfer tickets back to sender
    for (const ticket of receiverTickets) {
      ticket.wallet = transfer.sender.wallet;
      await this.ticketRepository.save(ticket);
    }

    // Update wallet balances
    transfer.receiver.wallet.ticketBalance -= transfer.quantity;
    transfer.sender.wallet.ticketBalance += transfer.quantity;

    // Save wallet changes
    await this.walletRepository.save(transfer.receiver.wallet);
    await this.walletRepository.save(transfer.sender.wallet);

    transfer.deletedAt = new Date();
    await this.transferRepository.save(transfer); // Soft delete
  }

  // Get received transfers for student with this national id
  async getReceivedTransfers(studentNationalId: number): Promise<Transfer[]> {
    const transfers = await this.transferRepository.find({
      where: { receiver: { nationalId: studentNationalId } },
      relations: ['receiver', 'sender'],
      order: { createdAt: 'DESC' },
    });
    
    return transfers.map(transfer => this.mapTransferStudent(transfer));
  }

  // Get sent transfers for student with this national id
  async getSentTransfers(studentNationalId: number): Promise<Transfer[]> {
    const transfers = await this.transferRepository.find({
      where: { sender: { nationalId: studentNationalId } },
      relations: ['receiver', 'sender'],
      order: { createdAt: 'DESC' },
    });
    
    return transfers.map(transfer => this.mapTransferStudent(transfer));
  }
}