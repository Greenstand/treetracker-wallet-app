import axios, { isAxiosError } from "axios";
import { TREETRACKER_WALLET_API } from "../utils/config";

// Transaction (lineage) history for a token. Mirrors GET /tokens/:id/transactions.
export async function getTokenTransactions(
  token: string,
  id: string,
  limit: number = 100,
) {
  try {
    const response = await axios.get(
      `${TREETRACKER_WALLET_API}/tokens/${id}/transactions?limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // { history: [...] }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get token transactions";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
