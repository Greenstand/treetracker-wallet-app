const keycloakBaseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL || "";

// Function to get the token
const getToken = async () => {
  const tokenApi = `${keycloakBaseUrl}/realms/master/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    grant_type: "password",
    client_id: process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_CLIENT_ID || "",
    username: process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN || "",
    password: process.env.NEXT_PUBLIC_KEYCLOAK_PASSWORD || "",
  });

  const response = await fetch(tokenApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to get access token: ${errorMessage}`);
  }

  const tokenData = await response.json();
  return tokenData.access_token;
};

export { getToken };
