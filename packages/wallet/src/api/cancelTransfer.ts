import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Sender cancels a transfer they initiated (before the receiver accepts).
// Mirrors DELETE /transfers/:id.
export async function cancelTransfer(token: string, id: string) {
  try {
    const response = await axios.delete(
      `${TREETRACKER_WALLET_API}/transfers/${id}`,
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
        error.response.data?.message || "Failed to cancel transfer";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
