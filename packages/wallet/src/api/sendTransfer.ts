import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Initiate a transfer: either a bundle of N generic tokens or a list of specific
// token IDs, from sender_wallet to receiver_wallet. Mirrors POST /transfers.
export type SendTransferInput = {
  sender_wallet: string;
  receiver_wallet: string;
  bundle_size?: number; // use this OR tokens
  tokens?: string[];
  claim?: boolean;
};

export async function sendTransfer(token: string, input: SendTransferInput) {
  const body =
    input.tokens && input.tokens.length > 0
      ? {
          tokens: input.tokens,
          sender_wallet: input.sender_wallet,
          receiver_wallet: input.receiver_wallet,
          claim: input.claim ?? false,
        }
      : {
          bundle: { bundle_size: input.bundle_size },
          sender_wallet: input.sender_wallet,
          receiver_wallet: input.receiver_wallet,
          claim: input.claim ?? false,
        };

  try {
    const response = await axios.post(
      `${TREETRACKER_WALLET_API}/transfers`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // the transfer object
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to send transfer";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
