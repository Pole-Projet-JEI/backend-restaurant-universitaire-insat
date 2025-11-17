import { Injectable } from "@nestjs/common";
import { WalletsService } from "src/wallets/wallets.service";
import { ScanRetrieveDto } from "./dtos/scan-retrieve.dto";

@Injectable()
export class ScanService {
  constructor(private readonly walletsService: WalletsService) {}

  async scanToRetrieveTicket(scanRetrieveDto: ScanRetrieveDto): Promise<void> {
    const { studenNationalId } = scanRetrieveDto;
    const wallet = await this.walletsService.removeFirstNTicketsWithCIN(studenNationalId, 1);
  }
}
