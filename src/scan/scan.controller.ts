import { Body, Controller, Post } from "@nestjs/common";
import { ScanService } from "./scan.service";

@Controller("scan")
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post("retrieve-ticket")
  async scanToRetrieveTicket(@Body() cin: number) {
    this.scanService.scanToRetrieveTicket(cin);
    return { message: `Retrieved one ticket from student with CIN ${cin}` };
  }
}
