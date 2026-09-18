import { useState, useEffect, useCallback } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getWallets } from "../api/getWallets";

export const useGetWallets = () => {
  const token = useAtomValue(tokenAtom);
  const [wallets, setWallets] = useState([]);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setIsWalletLoading(false);
      return false;
    }

    setIsWalletLoading(true);
    setError(null);

    try {
      const result = await getWallets(token, 10);

      setWallets(
        result.wallets.map((w: any) => ({
          id: w.id,
          name: w.name,
          about: w.about,
          display_name: w.display_name,
          logo_url: w.logo_url,
          cover_url: w.cover_url,
          created_at: new Date(w.created_at).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          tokens_in_wallet: w.tokens_in_wallet,
        })),
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      return false;
    } finally {
      setIsWalletLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  return { wallets, isWalletLoading, error, reload: load };
};
