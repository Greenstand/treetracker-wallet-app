import { TREETRACKER_API, WALLET_API_KEY } from "../utils/config";
import axios, { isAxiosError } from "axios";

export async function getWallets(token: string, numberOfWallets: number = 10) {
  try {
    const response = await axios.get(
      `${TREETRACKER_API}/wallets?limit=${numberOfWallets}`,
      {
        headers: {
          "Content-Type": "application/json",
          "treetracker-api-key": WALLET_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to get wallets";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
