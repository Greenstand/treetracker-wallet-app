import { authHandlers } from "./authHandlers";
import { walletHandlers } from "./walletHandlers";
import { keycloakHandlers } from "./keycloakHandlers";

export const handlers = [
  ...authHandlers,
  ...walletHandlers,
  ...keycloakHandlers,
];

export { authHandlers, walletHandlers, keycloakHandlers };
export { mockUser } from "./authHandlers";
export { mockWallets, mockTokens, mockTransfers } from "./walletHandlers";
export { mockKeycloakToken } from "./keycloakHandlers";
