import { redeemActionToken } from "@treetracker/wallet";
import { clearPendingActionToken, readPendingActionToken } from "./actionToken";

export type ClaimOutcome = {
  severity: "success" | "error";
  message: string;
} | null;

// Map raw backend redeem errors to user-friendly claim messages.
function claimErrorMessage(raw: string): string {
  if (/expired/i.test(raw)) return "This link has expired.";
  if (/not verified/i.test(raw)) return "This link is not valid.";
  if (/no longer owned/i.test(raw)) return "This link has already been used.";
  return "Could not claim your shared token.";
}

// Redeem a link saved before the user was able to claim it. Returns null when
// there is nothing pending, so callers can stay quiet in the common case.
//
// The link leaves storage before the request goes out. It is single use, so a
// failed redeem must not be retried forever, and both callers
// (PendingClaimHandler and wallet creation) can be alive in the same session:
// the first to read the link takes it, and the other finds nothing pending.
export async function claimPendingToken(
  authToken: string,
  walletName: string,
): Promise<ClaimOutcome> {
  const pending = readPendingActionToken();
  if (!pending) return null;
  clearPendingActionToken();

  try {
    await redeemActionToken(authToken, pending, walletName);
    return {
      severity: "success",
      message: `Your shared token has been claimed and added to "${walletName}".`,
    };
  } catch (e) {
    return {
      severity: "error",
      message: claimErrorMessage(e instanceof Error ? e.message : ""),
    };
  }
}
