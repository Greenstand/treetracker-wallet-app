import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config({ path: "../../.env" });

let adminToken: string;

beforeAll(async () => {
  const tokenUrl = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.PRIVATE_KEYCLOAK_CLIENT_ID!);
  params.append("client_secret", process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET!);

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    adminToken = response.data.access_token;
    console.log("✅ Admin token fetched for tests");
  } catch (err: any) {
    console.error(
      "❌ Failed to fetch admin token:",
      err.response?.data || err.message,
    );
    throw err;
  }
});

export { adminToken };
