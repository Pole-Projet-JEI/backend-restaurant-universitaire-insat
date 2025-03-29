import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from '../typeorm/entities/transfer.entity';
import { GenericCrudService } from '../generic-crud.service';
import { Repository } from 'typeorm';
import { Student } from '../typeorm/entities/Users/student.entity';
import { CreateTransferDto } from './transfer.dto';
import { Wallet } from '../typeorm/entities/wallet.entity';

@Injectable()
export class TransferService extends GenericCrudService<Transfer> {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {
    super(transferRepository);
  }

  async create(transferData: CreateTransferDto): Promise<Transfer> {
    const { senderNationalId, receiverNationalId, quantity } = transferData;
    
    // Get sender with wallet
    const sender = await this.studentRepository.findOne({
      where: { nationalId: senderNationalId },
      relations: ['wallet']
    });
    
    // Get receiver with wallet
    const receiver = await this.studentRepository.findOne({
      where: { nationalId: receiverNationalId },
      relations: ['wallet']
    });

    if (!sender) throw new NotFoundException(`Sender with nationalId ${senderNationalId} not found`);
    if (!receiver) throw new NotFoundException(`Receiver with nationalId ${receiverNationalId} not found`);
    if (!sender.wallet) throw new BadRequestException('Sender has no wallet');
    if (!receiver.wallet) throw new BadRequestException('Receiver has no wallet');

    // Check balance
    if (sender.wallet.ticketBalance < quantity) {
      throw new BadRequestException('Insufficient ticket balance');
    }

    // Start transaction
    return this.transferRepository.manager.transaction(async transactionalEntityManager => {
      // Update wallets
      await transactionalEntityManager.update(Wallet, sender.wallet.id, {
        ticketBalance: sender.wallet.ticketBalance - quantity
      });
      
      await transactionalEntityManager.update(Wallet, receiver.wallet.id, {
        ticketBalance: receiver.wallet.ticketBalance + quantity
      });

      // Create transfer record
      return transactionalEntityManager.save(Transfer, {
        quantity,
        sender,
        receiver
      });
    });
  }

  async getTransfersByStudent(nationalId: number): Promise<Transfer[]> {
    return this.transferRepository.find({
      where: [
        { sender: { nationalId } },
        { receiver: { nationalId } }
      ],
      relations: ['sender', 'receiver', 'sender.wallet', 'receiver.wallet'],
      order: { createdAt: 'DESC' }
    });
  }
}