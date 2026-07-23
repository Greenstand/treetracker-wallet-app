import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getTransfer } from "../api/getTransfer";
import { getTransferTokens } from "../api/getTransferTokens";
import { Transfer } from "../types/wallet";

// Fetches a transfer's details plus the tokens it carries.
export const useGetTransfer = (id: string) => {
  const token = useAtomValue(tokenAtom);
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const [tokens, setTokens] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!token || !id) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const [t, tk] = await Promise.all([
          getTransfer(token, id),
          getTransferTokens(token, id).catch(() => ({ tokens: [] })),
        ]);
        setTransfer(t);
        setTokens(tk.tokens || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [token, id]);

  return { transfer, tokens, isLoading, error };
};
