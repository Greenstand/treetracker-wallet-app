import { Injectable, OnModuleInit } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { pgClient } from "@queue/pgClient.js";
import { subscribe } from "@queue/subscribe.js";

@Injectable()
export class QueueListenerService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    try {
      console.log("Subscribing to PostgreSQL notifications...");
      const clientID = "nestjs-service";
      const channel = "wallets/creation";

      const subscribeResponse = await subscribe({
        pgClient,
        clientID,
        channel,
      });
      this.sendToWalletApi(subscribeResponse);
    } catch (error) {
      console.error("Error initializing queue listener:", error);
    }
  }

  async sendToWalletApi(payload: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post("/wallet/v2/wallets", payload),
      );
      console.log("Wallet API response:", response.data);
    } catch (error) {
      console.error("Error sending to Wallet API:", error);
    }
  }
}
