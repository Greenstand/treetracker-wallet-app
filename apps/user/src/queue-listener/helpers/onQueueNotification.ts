import { pgClient } from "@packages/queue/pgClient";
import subscribe from "@packages/queue/subscribe";
import { randomUUID } from "crypto";

type NotificationPayload = {
  capture_id: string;
  wallet_id: string; // uuid for new wallet;
  account_id: string; // uuid for the user who created this wallet;
  created_at: string; // timestamp with timezone of event;
  operator: string; // account uuid of who did this operation;
};

const clientId = "user-api-client"; // unique id to identify client

const messageObj = {
  channel: "wallets/creation",
  data: {
    capture_id: randomUUID(),
  },
};

export function onQueueNotification(callback: (accountId: string) => void) {
  return subscribe({
    pgClient: pgClient,
    channel: messageObj.channel,
    clientID: clientId,
  }).then(emitter =>
    emitter.on("message", msg => {
      const payload: NotificationPayload = JSON.parse(msg.payload);
      callback(payload.account_id);
    }),
  );
}

export default onQueueNotification;
