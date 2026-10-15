import { useEffect, useState } from "react";
import { getTokenTree, TokenTree } from "../api/getTokenTree";

export const useGetTokenTree = (id: string) => {
  const [tree, setTree] = useState<TokenTree | null>(null);
  const [isTreeLoading, setIsTreeLoading] = useState(true);
  const [treeError, setTreeError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) {
        setIsTreeLoading(false);
        return;
      }
      setIsTreeLoading(true);
      setTreeError(null);
      try {
        setTree(await getTokenTree(id));
      } catch (err) {
        setTreeError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsTreeLoading(false);
      }
    }
    load();
  }, [id]);

  return { tree, isTreeLoading, treeError };
};
