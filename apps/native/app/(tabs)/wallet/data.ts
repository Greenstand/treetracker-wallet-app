export type WalletSummary = {
  id: string;
  name: string;
  createdOn: string;
  balance: number;
  currency?: string;
};

export const walletSummaries: WalletSummary[] = [
  {
    id: "wallet-2",
    name: "Wallet 2",
    createdOn: "May 22, 2024",
    balance: 1000,
    currency: "TTK",
  },
  {
    id: "wallet-1",
    name: "Wallet 1",
    createdOn: "May 16, 2024",
    balance: 3455,
    currency: "TTK",
  },
];

export function getWalletSummaryById(id: string | undefined) {
  if (!id) {
    return undefined;
  }

  return walletSummaries.find(wallet => wallet.id === id);
}
