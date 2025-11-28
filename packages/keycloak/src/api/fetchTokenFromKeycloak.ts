// fetchTokenFromKeycloak.ts
import axios from "axios";
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_TOKEN_URL,
} from "../utils/config";

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
  const body = new URLSearchParams({
    client_id: KEYCLOAK_CLIENT_ID,
    client_secret: KEYCLOAK_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const { data } = await axios.post<KeycloakTokenResponse>(
    KEYCLOAK_TOKEN_URL,
    body.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );

  return {
    access_token: data.access_token,
    tokenExpiresAt: Date.now() + Math.max(0, data.expires_in - 10) * 1000,
  };
}
