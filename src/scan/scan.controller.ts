import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ScanService } from "./scan.service";
import { ScanRetrieveDto } from "./dtos/scan-retrieve.dto";

@Controller("scan")
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post("retrieve-ticket")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async scanToRetrieveTicket(@Body() scanRetrieveDto: ScanRetrieveDto) {
    return this.scanService.scanToRetrieveTicket(scanRetrieveDto);
  }
}
