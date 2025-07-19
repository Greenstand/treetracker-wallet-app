import { atom } from "jotai";
import { tokenAtom } from "./tokenAtom";
import { loadingAtom } from "./loadingAtom";

export const logoutAtom = atom(null, (_get, set) => {
  set(tokenAtom, null);
});
