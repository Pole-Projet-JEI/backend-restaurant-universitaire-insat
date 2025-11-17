import { Module } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanController } from './scan.controller';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
  providers: [ScanService],
  controllers: [ScanController],
  imports: [WalletsModule]
})
export class ScanModule {}
