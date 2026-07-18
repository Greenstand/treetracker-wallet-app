import { setupWorker } from "msw/browser";
import { authHandlers, keycloakHandlers, walletHandlers } from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...keycloakHandlers,
  ...walletHandlers,
);
