import "dotenv/config";

let TREETRACKER_API: string = "";

const isNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

if (!isNative) {
  TREETRACKER_API = process.env.NEXT_PUBLIC_TREETRACKER_API ?? "";
} else {
  const Constants = require("expo-constants").default;
  TREETRACKER_API =
    Constants.expoConfig?.extra?.apiBaseUrl ??
    Constants.manifest?.extra?.apiBaseUrl ??
    "";
}

export { TREETRACKER_API };
