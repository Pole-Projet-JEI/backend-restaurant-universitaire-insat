import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";
import { QrcodeService } from "./qrcode.service";
import { QrCode } from "src/typeorm/entities/qrCode.entity";
import { QRCodeDto as QrcodeDto } from "./dtos/qr-code.dto";

@ApiTags("qrcodes")
@Controller("qrcodes")
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post()
  @ApiCreatedResponse({
    description: "QR Code created successfully",
    type: QrCode,
  })
  @ApiBadRequestResponse({ description: "Invalid QR Code data" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() qrcodeDto: QrcodeDto): Promise<QrCode> {
    return this.qrcodeService.create(qrcodeDto);
  }

  @Get()
  @ApiOkResponse({ description: "List of all QR Codes", type: [QrCode] })
  async findAll(): Promise<QrCode[]> {
    return this.qrcodeService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "QR Code found", type: QrCode })
  @ApiNotFoundResponse({ description: "QR Code not found" })
  async findOne(@Param("id") id: string): Promise<QrCode> {
    return this.qrcodeService.findOne(Number(id));
  }

  @Patch(":id")
  @ApiOkResponse({ description: "QR Code updated successfully", type: QrCode })
  @ApiBadRequestResponse({ description: "Invalid update data" })
  async update(
    @Param("id") id: string,
    @Body() qrcodeDto: Partial<QrcodeDto>
  ): Promise<QrCode> {
    return this.qrcodeService.update(Number(id), qrcodeDto);
  }

  @Delete(":id")
  @ApiNoContentResponse({ description: "QR Code deleted successfully" })
  @ApiNotFoundResponse({ description: "QR Code not found" })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string): Promise<void> {
    return this.qrcodeService.delete(Number(id));
  }
}
