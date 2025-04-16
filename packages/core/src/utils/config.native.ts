import Constants from "expo-constants";

export const WALLET_APP_API =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_WALLET_APP_API ||
  "http://localhost:8080";
