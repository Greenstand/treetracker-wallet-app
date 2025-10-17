import { TREETRACKER_API, WALLET_API_KEY } from "../utils/config";

export async function getWallets(token: string, numberOfWallets: number = 10) {
  const response = await fetch(
    `${TREETRACKER_API}/wallets?limit=${numberOfWallets}`,
    {
      headers: {
        "Content-Type": "application/json",
        "treetracker-api-key": WALLET_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get wallets");
  }

  return response.json();
}
