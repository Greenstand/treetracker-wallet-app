let config;

if (typeof window === "undefined") {
  config = require("./config.web");
} else {
  config = require("./config.native");
}

export const WALLET_APP_API = config.WALLET_APP_API;
