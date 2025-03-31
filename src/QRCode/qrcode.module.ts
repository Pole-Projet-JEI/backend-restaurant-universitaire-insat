import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { QrCode } from 'src/typeorm/entities/qrCode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QrCode])],
  providers: [QrcodeService],
  controllers: [QrcodeController]
})
export class QrcodeModule {}
