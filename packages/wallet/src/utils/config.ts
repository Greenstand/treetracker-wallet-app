type ExpoExtra = Record<string, string | undefined>;

function getExpoExtra(): ExpoExtra {
  try {
    const Constants = require("expo-constants").default;
    return {
      ...(Constants.expoConfig?.extra ?? {}),
      ...(Constants.manifest?.extra ?? {}),
    };
  } catch {
    return {};
  }
}

const extra = getExpoExtra();

const TREETRACKER_WALLET_API = (
  extra.walletAppApi ??
  extra.EXPO_PUBLIC_WALLET_APP_API ??
  process.env.EXPO_PUBLIC_WALLET_APP_API ??
  process.env.NEXT_PUBLIC_WALLET_APP_API ??
  process.env.NEXT_PUBLIC_TREETRACKER_WALLET_API ??
  ""
).replace(/\/$/, "");

export { TREETRACKER_WALLET_API };
