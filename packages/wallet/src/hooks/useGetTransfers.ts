import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getTransfers } from "../api/getTransfers";
import { Transfer } from "../types/wallet";

export type { Transfer };

export const useGetTransfers = (limit: number = 5) => {
  const token = useAtomValue(tokenAtom);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isTransfersLoading, setIsTransfersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!token) {
        setIsTransfersLoading(false);
        return;
      }
      setIsTransfersLoading(true);
      setError(null);
      try {
        const result = await getTransfers(token, limit);
        setTransfers(result.transfers || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsTransfersLoading(false);
      }
    }
    load();
  }, [token, limit]);

  return { transfers, isTransfersLoading, error };
};
