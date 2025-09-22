// fetchTokenFromKeycloak.ts
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

type KeycloakTokenResponse = {
  access_token: string;
  expires_in: number; // seconds
  token_type: string;
  scope?: string;
};

export async function fetchTokenFromKeycloak(): Promise<{
  access_token: string;
  tokenExpiresAt: number;
}> {
  const base = process.env.PRIVATE_KEYCLOAK_BASE_URL!;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM!;
  const clientId = process.env.PRIVATE_KEYCLOAK_CLIENT_ID!;
  const clientSecret = process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET!;
  const url = `${base}/realms/${realm}/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const { data } = await axios.post<KeycloakTokenResponse>(
    url,
    body.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );

  return {
    access_token: data.access_token,
    tokenExpiresAt: Date.now() + Math.max(0, data.expires_in - 10) * 1000,
  };
}
