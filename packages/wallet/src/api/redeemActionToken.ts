import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Redeem an action token from the caller's wallet: the named tokens move from
// the sender wallet to the caller as a single completed transfer.
// Mirrors POST /action-tokens/redeem.
export type RedeemActionTokenResult = {
  state?: string;
  parameters?: { tokens?: string[] };
  [key: string]: unknown;
};

export async function redeemActionToken(
  token: string,
  actionToken: string,
): Promise<RedeemActionTokenResult> {
  try {
    const response = await axios.post(
      `${TREETRACKER_WALLET_API}/action-tokens/redeem`,
      { action_token: actionToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to redeem action token";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
