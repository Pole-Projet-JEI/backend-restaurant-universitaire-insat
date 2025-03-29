import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QrCode } from "src/typeorm/entities/qrCode.entity";
import { Repository } from "typeorm";
import { GenericCrudService } from "src/generic-crud.service";

@Injectable()
export class QrcodeService extends GenericCrudService<QrCode> {
  constructor(
    @InjectRepository(QrCode)
    private readonly qrcodeRepository: Repository<QrCode>
  ) {
    super(qrcodeRepository);
  }
}