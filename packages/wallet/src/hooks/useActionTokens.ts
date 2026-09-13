import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { getActionTokens } from "../api/getActionTokens";
import { cancelActionToken } from "../api/cancelActionToken";
import { ActionTokenSummary } from "../types/wallet";

// Lists the caller's issued share links and exposes a cancel action.
export const useActionTokens = () => {
  const token = useAtomValue(tokenAtom);
  const [links, setLinks] = useState<ActionTokenSummary[]>([]);
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
      const res = await getActionTokens(token);
      setLinks(res.action_tokens || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const cancel = async (id: string) => {
    if (!token) throw new Error("User not authenticated");
    await cancelActionToken(token, id);
    await load();
  };

  return { links, isLoading, error, reload: load, cancel };
};
