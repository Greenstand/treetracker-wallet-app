import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getTransfers } from "../api/getTransfers";
import { acceptTransfer } from "../api/acceptTransfer";
import { declineTransfer } from "../api/declineTransfer";
import { cancelTransfer } from "../api/cancelTransfer";
import { Transfer } from "../types/wallet";

// Lists pending/requested transfers and exposes accept/decline/cancel actions.
// Pass a wallet id/name to scope to one wallet (optional).
export const usePendingTransfers = (wallet?: string) => {
  const token = useAtomValue(tokenAtom);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // The API filters by a single state; fetch requested + pending and merge.
      const [requested, pending] = await Promise.all([
        getTransfers(token, { state: "requested", wallet, limit: 100 }),
        getTransfers(token, { state: "pending", wallet, limit: 100 }),
      ]);
      setTransfers([
        ...(requested.transfers || []),
        ...(pending.transfers || []),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, [token, wallet]);

  useEffect(() => {
    load();
  }, [load]);

  const withReload = (fn: (token: string, id: string) => Promise<unknown>) =>
    async (id: string) => {
      if (!token) throw new Error("User not authenticated");
      await fn(token, id);
      await load();
    };

  return {
    transfers,
    isLoading,
    error,
    reload: load,
    accept: withReload(acceptTransfer),
    decline: withReload(declineTransfer),
    cancel: withReload(cancelTransfer),
  };
};
