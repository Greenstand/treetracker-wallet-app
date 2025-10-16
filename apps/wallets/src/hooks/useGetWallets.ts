import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getWallets } from "../api/getWallets";

export const useGetWallets = () => {
  const token = useAtomValue(tokenAtom);
  const [wallets, setWallets] = useState([]);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!token) {
        setIsWalletLoading(false);
        return;
      }

      setIsWalletLoading(true);
      setError(null);

      try {
        const result = await getWallets(token, 10);

        console.log(result);
        setWallets(
          result.wallets.map((w: any) => ({
            name: w.name,
            created_at: new Date(w.created_at).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            tokens_in_wallet: w.tokens_in_wallet,
          })),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsWalletLoading(false);
      }
    }

    load();
  }, [token]);

  return { wallets, isWalletLoading, error };
};
