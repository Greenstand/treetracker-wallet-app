import axios, { isAxiosError } from "axios";
import { Wallet } from "../types/wallet";
import { TREETRACKER_API, WALLET_API_KEY } from "../utils/config";

async function createWallet(walletData: Wallet, token: string) {
  try {
    const response = await axios.post(
      `${TREETRACKER_API}/wallets`,
      {
        wallet: walletData.name,
        about: walletData.about,
      },
      {
        headers: {
          "treetracker-api-key": WALLET_API_KEY,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to create wallet";
      throw new Error(errorMessage);
    }
    throw error;
  }
}

export default createWallet;
