import { atom } from "jotai";
import { User } from "../types/auth";
import { storage } from "../utils/storage";
import { appStore } from "../store";

export const registerStateAtom = atom<User>({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isSubmitting: false,
  submissionSuccess: false,
  error: null,
  fieldErrors: {},
});

export const loginStateAtom = atom<User>({
  username: "",
  password: "",
  isSubmitting: false,
  submissionSuccess: false,
  error: null,
  fieldErrors: {},
});

export const registerAtom = atom(registerStateAtom);
export const loginAtom = atom(loginStateAtom);

const isWeb = typeof window !== "undefined";

export const userAuthAtomWeb = atom<boolean>(false);
export const userAuthAtomNative = atom<boolean>(false);

export const userAuthAtom = isWeb ? userAuthAtomWeb : userAuthAtomNative;

export const authAtom = atom(
  async get => {
    const storedAuth = await storage.getItem("isAuth");
    return storedAuth === "true";
  },
  async (get, set, newValue: boolean) => {
    set(userAuthAtom, newValue);
    await storage.setItem("isAuth", newValue.toString());
  },
);

export const getRegisterAtom = () => appStore.get(registerStateAtom);
export const getLoginAtom = () => appStore.get(loginStateAtom);
export const getAuthAtom = () => appStore.get(userAuthAtom);
