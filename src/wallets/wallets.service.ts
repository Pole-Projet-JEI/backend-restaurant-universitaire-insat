import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from 'src/generic-crud.service';
import { Student } from 'src/typeorm/entities/Users/student.entity';
import { Wallet } from 'src/typeorm/entities/wallet.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WalletDto } from './dtos/walletDto';

@Injectable()
export class WalletsService extends GenericCrudService<Wallet>{
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,       
    ){
        super(walletRepository)
    }
    
}
