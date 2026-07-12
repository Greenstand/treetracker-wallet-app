import { setupServer } from "msw/node";
import { authHandlers, keycloakHandlers, walletHandlers } from "./handlers";

export const server = setupServer(
  ...authHandlers,
  ...keycloakHandlers,
  ...walletHandlers,
);
