import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { pgClient, Notification } from "@packages/queue/pgClient.js";
import { ack } from "@packages/queue/ack.js";

type NotificationPayload = {
  capture_id: string;
  wallet_id: string; // uuid for new wallet;
  account_id: string; // uuid for the user who created this wallet;
  created_at: string; // timestamp with timezone of event;
  operator: string; // account uuid of who did this operation;
};

const WALLET_API_ENDPOINT = `/wallet/v2`;

const endpoints = {
  transfer: `${WALLET_API_ENDPOINT}/transfers`,
  wallets: (accountId: string) =>
    `${WALLET_API_ENDPOINT}/wallets?account_id=${accountId}`,
};

const subscribe = (
  pgClient_inject: typeof pgClient,
  clientId: string,
  channel: string,
  callback: (account_id: string) => Promise<void>,
) => {
  console.log("Subscribing to PostgreSQL notifications...");
  pgClient_inject.query(`LISTEN ${channel}`);
  pgClient_inject.on("notification", async (msg: Notification) => {
    if (msg.channel === channel) {
      try {
        const payload: NotificationPayload = JSON.parse(msg.payload);
        const date = new Date();
        const dateStr = date.toISOString();

        await callback(payload.account_id);
        await ack({
          pgClient_inject,
          id: payload.capture_id,
          dateStr,
          clientId,
        });
      } catch (error) {
        console.error("Error parsing wallet creation event:", error);
      }
    }
  });
};

@Injectable()
export class QueueListenerService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private authToken: () => Promise<string>,
  ) {}

  async onModuleInit() {
    try {
      const clientId = "user-api-client"; // unique id to identify client
      const channel = "wallets/creation"; // channel name

      subscribe(pgClient, clientId, channel, (account_id: string) =>
        this.sendToWalletApi(account_id),
      );
    } catch (error) {
      console.error("Error initializing queue listener:", error);
    }
  }

  async transferToken(walletId: string) {
    // get auth bearer token from keycloak
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
              "treetracker-api-key": process.env.PRIVATE_WALLET_API_KEY,
              Authorization: `Bearer ${this.authToken()}`,
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
      if (process.env.PRIVATE_WALLET_API_KEY) {
        const { data: listOfManagedWalletsByUser } = await firstValueFrom(
          this.httpService.get(endpoints.wallets(accountId), {
            headers: {
              "Content-Type": "application/json",
              "treetracker-api-key": process.env.PRIVATE_WALLET_API_KEY,
              Authorization: `Bearer ${this.authToken()}`,
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
