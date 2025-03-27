import { pgClient } from "@packages/queue/pgClient.js";
import subscribe from "@packages/queue/subscribe.js";
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

// const subscribe = (callback: (account_id: string) => Promise<void>) => {
//   console.log("Subscribing to PostgreSQL notifications...");

//   const clientId = "user-api-client"; // unique id to identify client
//   const channel = "wallets/creation"; // channel name
//   pgClient.query(`LISTEN ${channel}`);
//   pgClient.on("notification", async (msg: Notification) => {
//     if (msg.channel === channel) {
//       try {
//         const payload: NotificationPayload = JSON.parse(msg.payload);
//         const date = new Date();
//         const dateStr = date.toISOString();

//         await callback(payload.account_id);
//         await ack({
//           pgClient,
//           id: payload.capture_id,
//           dateStr,
//           clientId,
//         });
//       } catch (error) {
//         console.error("Error parsing wallet creation event:", error);
//       }
//     }
//   });
// };

export default onQueueNotification;
