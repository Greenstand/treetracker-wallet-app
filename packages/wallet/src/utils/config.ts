import "dotenv/config";

let TREETRACKER_WALLET_API: string = "";
let TREETRACKER_QUERY_API: string = "";

const isNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

if (!isNative) {
  TREETRACKER_WALLET_API = process.env.NEXT_PUBLIC_TREETRACKER_WALLET_API ?? "";
  TREETRACKER_QUERY_API = process.env.NEXT_PUBLIC_QUERY_API_URL ?? "";
} else {
  const Constants = require("expo-constants").default;
  TREETRACKER_WALLET_API =
    Constants.expoConfig?.extra?.apiBaseUrl ??
    Constants.manifest?.extra?.apiBaseUrl ??
    "";
  TREETRACKER_QUERY_API =
    Constants.expoConfig?.extra?.queryApiBaseUrl ??
    Constants.manifest?.extra?.queryApiBaseUrl ??
    "";
}

export { TREETRACKER_WALLET_API, TREETRACKER_QUERY_API };
