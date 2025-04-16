const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.join(__dirname, `../app/web/.env.${env}`),
});

export const WALLET_APP_API =
  process.env.NEXT_PUBLIC_WALLET_APP_API || "http://localhost:8080";
