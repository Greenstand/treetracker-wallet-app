import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Receiver accepts a pending transfer. Mirrors POST /transfers/:id/accept.
export async function acceptTransfer(token: string, id: string) {
  try {
    const response = await axios.post(
      `${TREETRACKER_WALLET_API}/transfers/${id}/accept`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // the completed transfer
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to accept transfer";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
