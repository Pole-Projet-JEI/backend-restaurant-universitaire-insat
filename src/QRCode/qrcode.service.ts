import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QrCode } from "src/typeorm/entities/qrCode.entity";
import { Repository } from "typeorm";
import { GenericCrudService } from "src/generic-crud.service";
import { QRCodeDto } from "./dtos/qr-code.dto";

@Injectable()
export class QrcodeService extends GenericCrudService<QrCode> {
  constructor(
    @InjectRepository(QrCode)
    private readonly qrcodeRepository: Repository<QrCode>
  ) {
    super(qrcodeRepository);
  }
  async create(data: QRCodeDto): Promise<QrCode> {
    const existing = await this.qrcodeRepository.findOne({
      where: [{ code: data.code }, { userId: data.userId }],
    });

    if (existing) {
      throw new ConflictException(
        existing.code === data.code
          ? "QR code already exists"
          : "User already has a QR code"
      );
    }
    console.log(`Creating QR code for user ${data.userId}`);

    return super.create(data);
  }
}
