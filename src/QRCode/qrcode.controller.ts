import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrCode } from 'src/typeorm/entities/qrcode.entity';
import { UpdateQRCodeDto as QrcodeDto } from './dtos/QRCodeDto';

@Controller('qrcodes')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() qrcodeDto: QrcodeDto): Promise<QrCode> {
    return this.qrcodeService.create(qrcodeDto);
  }

  @Get()
  async findAll(): Promise<QrCode[]> {
    return this.qrcodeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QrCode> {
    return this.qrcodeService.findOne(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() qrcodeDto: Partial<QrcodeDto>): Promise<QrCode> {
    return this.qrcodeService.update(Number(id), qrcodeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.qrcodeService.delete(Number(id));
  }
}
