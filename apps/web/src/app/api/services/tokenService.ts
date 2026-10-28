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
    // Check content-type before trying to parse
    const contentType = response.headers.get("content-type") || "";
    let errorMessage = `HTTP ${response.status}`;
    
    try {
      if (contentType.includes("application/json")) {
        // API returned JSON error
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
      } else {
        // API returned HTML or other format (don't try to JSON.parse it!)
        const text = await response.text();
        errorMessage = text.substring(0, 100); // Show first 100 chars
      }
    } catch {
      errorMessage = `HTTP ${response.status}`;
    }
    
    throw new Error(`Failed to get access token: ${errorMessage}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Failed to parse token response: Expected JSON, but received "${contentType}"`
    );
  }

  const tokenData = await response.json();
  return tokenData.access_token;
};

export { getToken };