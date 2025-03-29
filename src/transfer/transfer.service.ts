import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericCrudService } from '../generic-crud.service';
import { Transfer } from 'src/typeorm/entities/transfer.entity';
import { Wallet } from 'src/typeorm/entities/wallet.entity';
import { CreateTransferDto } from './transfer.dto';

@Injectable()
export class TransferService extends GenericCrudService<Transfer> {
  constructor(
    @InjectRepository(Transfer)
    protected readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {
    super(transferRepository);
  }

  async create(transferData: CreateTransferDto): Promise<Transfer> {
    const { senderWalletId, receiverWalletId, quantity } = transferData;

    // Validate wallets exist
    const [senderWallet, receiverWallet] = await Promise.all([
      this.walletRepository.findOneBy({ id: senderWalletId }),
      this.walletRepository.findOneBy({ id: receiverWalletId })
    ]);

    if (!senderWallet) throw new NotFoundException('Sender wallet not found');
    if (!receiverWallet) throw new NotFoundException('Receiver wallet not found');
    if (senderWalletId === receiverWalletId) throw new BadRequestException('Cannot transfer to same wallet');
    if (senderWallet.ticketBalance < quantity) throw new BadRequestException('Insufficient balance');

    return this.transferRepository.manager.transaction(async (manager) => {
      // Update balances
      await manager.update(
        Wallet, 
        { id: senderWalletId },
        { ticketBalance: senderWallet.ticketBalance - quantity }
      );
      
      await manager.update(
        Wallet, 
        { id: receiverWalletId },
        { ticketBalance: receiverWallet.ticketBalance + quantity }
      );

      // Create transfer record using parent class method
      return super.create({
        quantity,
        senderWalletId,
        receiverWalletId
      });
    });
  }

  async getOutgoingTransfers(walletId: number): Promise<Transfer[]> {
    return this.transferRepository.find({
      where: { senderWalletId: walletId },
      order: { createdAt: 'DESC' }
    });
  }
  
  async getIncomingTransfers(walletId: number): Promise<Transfer[]> {
    return this.transferRepository.find({
      where: { receiverWalletId: walletId },
      order: { createdAt: 'DESC' }
    });
  }
}