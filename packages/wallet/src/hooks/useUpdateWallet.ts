import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { updateWallet } from "../api/updateWallet";
import { WalletProfileUpdate } from "../types/wallet";

export const useUpdateWallet = () => {
  const token = useAtomValue(tokenAtom);

  const update = async (
    walletId: string,
    fields: WalletProfileUpdate,
    images?: { cover_image?: Blob; logo_image?: Blob },
  ) => {
    if (!token) {
      throw new Error("User not authenticated");
    }
    return updateWallet(token, walletId, fields, images);
  };

  return { updateWallet: update };
};
