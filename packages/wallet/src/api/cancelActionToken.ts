import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Sender revokes an outstanding share link so it can no longer be redeemed.
// Mirrors DELETE /action-tokens/:id.
export async function cancelActionToken(token: string, id: string) {
  try {
    const response = await axios.delete(
      `${TREETRACKER_WALLET_API}/action-tokens/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // the cancelled link summary
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to cancel share link";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
