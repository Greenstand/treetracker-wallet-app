let Constants;
let WALLET_APP_API;

if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
  Constants = require("expo-constants").default;

  WALLET_APP_API =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_WALLET_APP_API ||
    "http://localhost:8080";
}

export { WALLET_APP_API };
