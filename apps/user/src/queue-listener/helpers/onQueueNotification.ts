import { pgClient } from "@packages/queue/pgClient.js";
import subscribe from "@packages/queue/subscribe.js";
import { Logger } from "@nestjs/common";

type NotificationPayload = {
  capture_id: string;
  wallet_id: string; // uuid for new wallet;
  account_id: string; // uuid for the user who created this wallet;
  created_at: string; // timestamp with timezone of event;
  operator: string; // account uuid of who did this operation;
};

const clientId = "user-api-client"; // unique id to identify client
const channel = "wallets/creation";

export function onQueueNotification(
  callback: (walletId: string) => Promise<unknown> | unknown,
) {
  return subscribe({
    pgClient,
    channel,
    clientID: clientId,
  }).then(emitter =>
    emitter.on("message", msg => {
      void Promise.resolve()
        .then(async () => {
          const payload = msg.data as NotificationPayload;

          if (!payload || typeof payload.wallet_id !== "string") {
            throw new Error("Wallet creation event is missing wallet_id");
          }

          await callback(payload.wallet_id);
        })
        .catch(error => {
          Logger.error("Error handling wallet creation event:", error);
        });
    }),
  );
}

export default onQueueNotification;
