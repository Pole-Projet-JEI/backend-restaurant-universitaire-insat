import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { QrCode } from 'src/typeorm/entities/qrCode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/typeorm/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QrCode])],
  providers: [QrcodeService],
  controllers: [QrcodeController],
  exports: [QrcodeService],
})
export class QrcodeModule {}
