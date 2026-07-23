import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getTokenTransactions } from "../api/getTokenTransactions";
import { Transaction } from "../types/wallet";

// Transaction (lineage) history for a token: GET /tokens/:id/transactions.
export const useGetTokenTransactions = (id: string) => {
  const token = useAtomValue(tokenAtom);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
        const result = await getTokenTransactions(token, id);
        setTransactions(result.history || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [token, id]);

  return { transactions, isLoading, error };
};
