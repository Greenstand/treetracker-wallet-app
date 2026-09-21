// The wallet-api sends a `reason` slug alongside the message where the status
// alone is ambiguous, so a client can branch without parsing text.
export class WalletApiError extends Error {
  readonly reason?: string;

  constructor(message: string, reason?: string) {
    super(message);
    this.name = "WalletApiError";
    this.reason = reason;
  }
}

// The caller is signed in, the token is fine, the account just has no wallet.
export function isNoWalletError(error: unknown): boolean {
  return error instanceof WalletApiError && error.reason === "no_wallet";
}
