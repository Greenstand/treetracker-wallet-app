import "dotenv/config";

let TREETRACKER_WALLET_API: string = "";

const isNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

if (!isNative) {
  TREETRACKER_WALLET_API = process.env.NEXT_PUBLIC_TREETRACKER_WALLET_API ?? "";
} else {
  const Constants = require("expo-constants").default;
  TREETRACKER_WALLET_API =
    Constants.expoConfig?.extra?.apiBaseUrl ??
    Constants.manifest?.extra?.apiBaseUrl ??
    "";
}

export { TREETRACKER_WALLET_API };
