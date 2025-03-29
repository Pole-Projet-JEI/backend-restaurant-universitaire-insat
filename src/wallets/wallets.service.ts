import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from 'src/generic-crud.service';
import { Student } from 'src/typeorm/entities/Users/student.entity';
import { Wallet } from 'src/typeorm/entities/wallet.entity';
import { Repository } from 'typeorm';
@Injectable()
export class WalletsService extends GenericCrudService<Wallet>{
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,    
    ){
        super(walletRepository)
    }
    
}
