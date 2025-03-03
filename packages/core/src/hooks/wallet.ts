import { useEffect, useState } from "react";
import * as wallets from "../api/wallet";
import { Wallet } from "../types/wallet";

export default function useWalletList(userId: string | undefined) {
  const [list, setList] = useState<Wallet[]>([]);
  const [isWalletLoading, setIsWalletLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsWalletLoading(true);
      const ws = await wallets.getWalletsRecentActivity(userId || "");
      setIsWalletLoading(false);
      setList(ws);
    }
    load();
  }, []);

  return { list, isWalletLoading };
}
