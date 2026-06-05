import * as dotenv from 'dotenv';
dotenv.config();

export async function generateGiftToken(
  expiresAt: Date,
  payload: {
    tokenId: string;
    senderWalletId: string;
    recipientEmailAddress: string;
  },
): Promise<string> {
  const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM;
  const clientId = process.env.PRIVATE_KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET;

  const url = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId!,
    client_secret: clientSecret!,
    tokenId: payload.tokenId,
    senderWalletId: payload.senderWalletId,
    recipientEmailAddress: payload.recipientEmailAddress,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await response.json();
  return data.access_token;
}