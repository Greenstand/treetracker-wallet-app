import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Receiver declines a pending transfer. Mirrors POST /transfers/:id/decline.
export async function declineTransfer(token: string, id: string) {
  try {
    const response = await axios.post(
      `${TREETRACKER_WALLET_API}/transfers/${id}/decline`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // the cancelled transfer
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to decline transfer";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
