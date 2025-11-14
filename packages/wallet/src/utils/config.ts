import dotenv from "dotenv";

dotenv.config({ quiet: true });

let TREETRACKER_API: string = "";
let WALLET_API_KEY: string = "";

const isNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

if (!isNative) {
  TREETRACKER_API = process.env.NEXT_PUBLIC_TREETRACKER_API ?? "";
  WALLET_API_KEY = process.env.NEXT_PUBLIC_WALLET_API_KEY ?? "";
} else {
  const Constants = require("expo-constants").default;
  TREETRACKER_API =
    Constants.expoConfig?.extra?.apiBaseUrl ??
    Constants.manifest?.extra?.apiBaseUrl ??
    "";
  WALLET_API_KEY =
    Constants.expoConfig?.extra?.treetrackerApiKey ??
    Constants.manifest?.extra?.treetrackerApiKey ??
    "";
}

export { TREETRACKER_API, WALLET_API_KEY };
