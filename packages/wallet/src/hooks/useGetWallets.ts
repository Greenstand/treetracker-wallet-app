import { useState, useEffect, useCallback, useRef } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getWallets } from "../api/getWallets";

export const useGetWallets = () => {
  const token = useAtomValue(tokenAtom);
  const [wallets, setWallets] = useState([]);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Prevent repeated renders from issuing duplicate wallet requests for the
  // same session token; explicit reload() can still force a fresh request.
  const lastLoadedToken = useRef<string | null | undefined>(undefined);

  const load = useCallback(
    async (force = false) => {
      if (!token) {
        setIsWalletLoading(false);
        return false;
      }

      if (!force && lastLoadedToken.current === token) {
        return true;
      }

      lastLoadedToken.current = token;

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
            tokens_available: w.tokens_available,
            tokens_pending: w.tokens_pending,
          })),
        );
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
        return false;
      } finally {
        setIsWalletLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const reload = useCallback(() => load(true), [load]);

  return { wallets, isWalletLoading, error, reload };
};
