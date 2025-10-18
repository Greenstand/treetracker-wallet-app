import { Wallet } from "../types/wallet";
import { TREETRACKER_API, WALLET_API_KEY } from "../utils/config";

async function createWallet(walletData: Wallet, token: string) {
  const response = await fetch(`${TREETRACKER_API}/wallets`, {
    method: "POST",
    headers: {
      "treetracker-api-key": WALLET_API_KEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ wallet: walletData.name, about: walletData.about }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create wallet");
  }

  return response.json();
}

export default createWallet;
