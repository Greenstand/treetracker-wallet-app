import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { sendTransfer, SendTransferInput } from "../api/sendTransfer";

export const useSendTransfer = () => {
  const token = useAtomValue(tokenAtom);

  const send = async (input: SendTransferInput) => {
    if (!token) {
      throw new Error("User not authenticated");
    }
    return sendTransfer(token, input);
  };

  return { sendTransfer: send };
};
