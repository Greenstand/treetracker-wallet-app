// localStorage key holding an action token captured from a /claim link, to be
// redeemed once the recipient is signed in with a wallet (PendingClaimHandler)
// or when they create their first one (wallet page).
export const PENDING_ACTION_TOKEN_KEY = "pending_action_token";
const CLAIM_RETURN_PATH_KEY = "claim_return_path";

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

// Keep the original claim URL in this tab while the user completes the
// hosted authentication flow. This lets the claim page show wallet selection
// after sign-in instead of letting the background pending-claim fallback
// redeem into the first wallet.
export function saveClaimReturnPath(path: string): void {
  try {
    sessionStorage.setItem(CLAIM_RETURN_PATH_KEY, path);
  } catch {
    /* storage unavailable — ignore */
  }
}

export function consumeClaimReturnPath(): string | null {
  try {
    const path = sessionStorage.getItem(CLAIM_RETURN_PATH_KEY);
    sessionStorage.removeItem(CLAIM_RETURN_PATH_KEY);
    return path?.startsWith("/") && !path.startsWith("//") ? path : null;
  } catch {
    return null;
  }
}
