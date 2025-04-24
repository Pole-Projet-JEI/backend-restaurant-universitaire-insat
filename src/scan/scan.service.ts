import { Injectable } from "@nestjs/common";
import { WalletsService } from "src/wallets/wallets.service";

@Injectable()
export class ScanService {
  constructor(private readonly walletsService: WalletsService) {}

  async scanToRetrieveTicket(cin: number): Promise<void> {
    const wallet = await this.walletsService.removeFirstNTicketsWithCIN(cin, 1);
  }
}
