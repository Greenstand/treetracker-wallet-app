// core/src/utils/storage.ts
import type { AsyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";
import { isNative } from "./platform";

export const getAsyncStorage = (): AsyncStringStorage => {
  if (!isNative) {
    const asyncSessionStorage: AsyncStringStorage = {
      getItem: async key => Promise.resolve(sessionStorage.getItem(key)),
      setItem: async (key, value) => {
        sessionStorage.setItem(key, value);
        return Promise.resolve();
      },
      removeItem: async key => {
        sessionStorage.removeItem(key);
        return Promise.resolve();
      },
    };
    return asyncSessionStorage;
  } else {
    const AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
    return {
      getItem: key => AsyncStorage.getItem(key),
      setItem: (key, value) => AsyncStorage.setItem(key, value),
      removeItem: key => AsyncStorage.removeItem(key),
    };
  }
};
