import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { onQueueNotification } from "./helpers/onQueueNotification";

const WALLET_API_ENDPOINT = `/wallet/v2`;

const endpoints = {
  transfer: `${WALLET_API_ENDPOINT}/transfers`,
  wallets: (accountId: string) =>
    `${WALLET_API_ENDPOINT}/wallets?account_id=${accountId}`,
};

@Injectable()
export class QueueListenerService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
  ) {}

  async onModuleInit() {
    try {
      onQueueNotification((account_id: string) =>
        this.sendToWalletApi(account_id),
      );
    } catch (error) {
      console.error("Error initializing queue listener:", error);
    }
  }

  async transferToken(walletId: string) {
    try {
      await firstValueFrom(
        this.httpService.post(
          endpoints.transfer,
          {
            bundle: {
              bundle_size: process.env.REGISTER_REWARD_TOKEN_COUNT, // this is a env var from user API to set up the count of token to reward
            },
            sender_wallet: process.env.SENDER_WALLET_ID, // env var too
            receive_wallet: walletId, // user wallet id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.authService.getToken()}`,
            },
          },
        ),
      );
      Logger.log(`token transfer has been completed for wallet ${walletId}`);
      return { transferStatus: true };
    } catch (error) {
      Logger.error("Error during token transfer to wallet:", error);
      return { transferStatus: true };
    }
  }

  async sendToWalletApi(accountId: string) {
    try {
      const token = await this.authService.getToken();
      if (token) {
        const { data: listOfManagedWalletsByUser } = await firstValueFrom(
          this.httpService.get(endpoints.wallets(accountId), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        );
        const userHasWallet = listOfManagedWalletsByUser?.length > 0;
        if (userHasWallet) {
          this.transferToken(listOfManagedWalletsByUser?.[0]);
        } else {
          Logger.error(`user ${accountId} has no wallets`);
        }
      }
    } catch (error) {
      Logger.error("Error sending to Wallet API:", error);
    }
  }
}
