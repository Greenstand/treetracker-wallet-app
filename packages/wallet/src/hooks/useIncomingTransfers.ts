import { useMemo } from "react";
import { useGetWallets } from "./useGetWallets";
import { usePendingTransfers } from "./usePendingTransfers";
import { Wallet } from "../types/wallet";

// Pending transfers addressed to one of this user's wallets, the only ones they can accept.
export const useIncomingTransfers = () => {
  const { wallets, isWalletLoading } = useGetWallets();
  const { transfers, isLoading } = usePendingTransfers();

  const myWallets = useMemo(
    () => new Set(wallets.map(w => (w as Wallet).name).filter(Boolean)),
    [wallets],
  );

  const incoming = useMemo(
    () =>
      transfers.filter(
        t => t.destination_wallet && myWallets.has(t.destination_wallet),
      ),
    [transfers, myWallets],
  );

  return { incoming, isLoading: isWalletLoading || isLoading };
};
