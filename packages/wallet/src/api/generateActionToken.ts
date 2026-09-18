import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Issue a signed, expiring action token authorizing a future transfer of the
// given tokens out of the caller's wallet. Mirrors POST /action-tokens.
export type GenerateActionTokenInput = {
  tokens?: string[]; // specific token ids, OR
  bundle_size?: number; // a bundle of N generic tokens
  recipient_email?: string; // informational (the intended recipient)
  sender_wallet?: string; // source wallet; defaults to the login wallet
};

export type GenerateActionTokenResult = {
  action_token: string;
  expires_at: string;
  token_count: number;
};

export async function generateActionToken(
  token: string,
  input: GenerateActionTokenInput,
): Promise<GenerateActionTokenResult> {
  const body =
    input.tokens && input.tokens.length > 0
      ? {
          tokens: input.tokens,
          recipient_email: input.recipient_email,
          sender_wallet: input.sender_wallet,
        }
      : {
          bundle: { bundle_size: input.bundle_size },
          recipient_email: input.recipient_email,
          sender_wallet: input.sender_wallet,
        };

  try {
    const response = await axios.post(
      `${TREETRACKER_WALLET_API}/action-tokens`,
      body,
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
        error.response.data?.message || "Failed to generate action token";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
