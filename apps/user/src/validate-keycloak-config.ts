export function validateKeycloakConfig(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const required = [
    "PRIVATE_KEYCLOAK_BASE_URL",
    "PRIVATE_KEYCLOAK_REALM",
    "PRIVATE_KEYCLOAK_CLIENT_ID",
    "PRIVATE_KEYCLOAK_CLIENT_SECRET",
  ];

  for (const key of required) {
    const value = config[key];
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`Missing required Keycloak configuration: ${key}`);
    }
  }

  const baseUrl = config.PRIVATE_KEYCLOAK_BASE_URL as string;
  try {
    const url = new URL(baseUrl);
    if (
      baseUrl !== baseUrl.trim() ||
      !["http:", "https:"].includes(url.protocol) ||
      !url.hostname
    ) {
      throw new Error();
    }
  } catch {
    throw new Error(
      "Invalid Keycloak configuration: PRIVATE_KEYCLOAK_BASE_URL must be an absolute HTTP(S) URL",
    );
  }

  return config;
}
