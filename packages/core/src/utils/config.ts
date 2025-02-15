import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../app/web/.env.development") });

export const WALLET_APP_API =
  process.env.NEXT_PUBLIC_WALLET_APP_API || "http://localhost:8080";
