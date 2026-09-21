// localStorage key holding an action token captured from a /claim link, to be
// redeemed once the recipient is signed in with a wallet (PendingClaimHandler)
// or when they create their first one (wallet page).
export const PENDING_ACTION_TOKEN_KEY = "pending_action_token";

export function savePendingActionToken(token: string): void {
  try {
    localStorage.setItem(PENDING_ACTION_TOKEN_KEY, token);
  } catch {
    /* storage unavailable — ignore */
  }
}

export function readPendingActionToken(): string | null {
  try {
    return localStorage.getItem(PENDING_ACTION_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearPendingActionToken(): void {
  try {
    localStorage.removeItem(PENDING_ACTION_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}
