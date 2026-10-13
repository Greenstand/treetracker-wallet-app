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

  return config;
}
