import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import createWallet from "../api/createWallet";
import { Wallet } from "../types/wallet";

export const useCreateWallet = () => {
  const token = useAtomValue(tokenAtom);

  const create = async (walletData: Wallet) => {
    if (!token) {
      throw new Error("User not authenticated");
    }
    return createWallet(walletData, token);
  };

  return { createWallet: create };
};
