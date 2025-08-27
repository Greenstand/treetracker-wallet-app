let WALLET_APP_API: string = "";

const isNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

if (!isNative) {
  WALLET_APP_API = process.env.NEXT_PUBLIC_WALLET_APP_API ?? "";
} else {
  const Constants = require("expo-constants").default;
  WALLET_APP_API =
    Constants.expoConfig?.extra?.apiBaseUrl ??
    Constants.manifest?.extra?.apiBaseUrl ??
    "";
}

export { WALLET_APP_API };