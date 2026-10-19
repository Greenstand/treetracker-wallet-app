import { EventEmitter } from "events";
import { Logger } from "@nestjs/common";
import subscribe from "@packages/queue/subscribe.js";
import { onQueueNotification } from "./onQueueNotification";

jest.mock("@packages/queue/pgClient.js", () => ({ pgClient: {} }));
jest.mock("@packages/queue/subscribe.js", () => jest.fn());

describe("onQueueNotification", () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
    (subscribe as jest.Mock).mockResolvedValue(emitter);
  });

  it("passes the wallet id from the queue row data to the callback", async () => {
    const callback = jest.fn().mockResolvedValue(undefined);
    await onQueueNotification(callback);

    emitter.emit("message", {
      id: "message-1",
      channel: "wallets/creation",
      data: {
        capture_id: "capture-1",
        wallet_id: "wallet-123",
        account_id: "account-123",
        created_at: "2026-10-19T00:00:00.000Z",
        operator: "account-123",
      },
      ack: {},
      created_at: "2026-10-19T00:00:00.000Z",
    });
    await new Promise<void>(resolve => process.nextTick(resolve));

    expect(callback).toHaveBeenCalledWith("wallet-123");
  });

  it("logs a malformed event without rejecting the listener", async () => {
    const callback = jest.fn();
    const logger = jest.spyOn(Logger, "error").mockImplementation();
    await onQueueNotification(callback);

    expect(() => emitter.emit("message", { data: {} })).not.toThrow();
    await new Promise<void>(resolve => process.nextTick(resolve));

    expect(callback).not.toHaveBeenCalled();
    expect(logger).toHaveBeenCalledWith(
      "Error handling wallet creation event:",
      expect.any(Error),
    );
  });
});
