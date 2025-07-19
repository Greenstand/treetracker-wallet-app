import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { getAsyncStorage } from "../../utils/storage";

export const tokenAtom = atomWithStorage(
  "token",
  null,
  createJSONStorage(getAsyncStorage),
);
