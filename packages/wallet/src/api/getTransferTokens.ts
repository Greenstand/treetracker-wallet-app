import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// List the tokens included in a transfer. Mirrors GET /transfers/:id/tokens.
export async function getTransferTokens(
  token: string,
  id: string,
  limit: number = 100,
) {
  try {
    const response = await axios.get(
      `${TREETRACKER_WALLET_API}/transfers/${id}/tokens?limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // { tokens: [...] }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get transfer tokens";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
