import { isWeb } from "./platform";

let AsyncStorage: any;

if (!isWeb) {
  import("@react-native-async-storage/async-storage")
    .then(module => {
      AsyncStorage = module.default;
    })
    .catch(err => console.error("AsyncStorage import failed", err));
}

export const storage = {
  getItem: async (key: string) => {
    if (isWeb) {
      return localStorage.getItem(key);
    } else {
      return AsyncStorage ? await AsyncStorage.getItem(key) : null;
    }
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) {
      localStorage.setItem(key, value);
    } else if (AsyncStorage) {
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (isWeb) {
      localStorage.removeItem(key);
    } else if (AsyncStorage) {
      await AsyncStorage.removeItem(key);
    }
  },
};
