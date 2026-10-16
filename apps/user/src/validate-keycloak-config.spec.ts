import { validateKeycloakConfig } from "./validate-keycloak-config";

const validConfig = {
  PRIVATE_KEYCLOAK_BASE_URL: "https://keycloak.example.org",
  PRIVATE_KEYCLOAK_REALM: "treetracker",
  PRIVATE_KEYCLOAK_CLIENT_ID: "wallet-user",
  PRIVATE_KEYCLOAK_CLIENT_SECRET: "test-secret",
};

describe("validateKeycloakConfig", () => {
  it("accepts a complete Keycloak configuration", () => {
    expect(validateKeycloakConfig(validConfig)).toEqual(validConfig);
  });

  it("accepts an HTTP Keycloak URL for local development", () => {
    const config = {
      ...validConfig,
      PRIVATE_KEYCLOAK_BASE_URL: "http://localhost:8080",
    };

    expect(validateKeycloakConfig(config)).toEqual(config);
  });

  it.each([
    "keycloak.example.org",
    "ftp://keycloak.example.org",
    " https://keycloak.example.org ",
  ])("rejects an unusable Keycloak base URL: %s", (baseUrl) => {
    expect(() =>
      validateKeycloakConfig({
        ...validConfig,
        PRIVATE_KEYCLOAK_BASE_URL: baseUrl,
      }),
    ).toThrow("PRIVATE_KEYCLOAK_BASE_URL");
  });

  for (const key of Object.keys(validConfig)) {
    it(`rejects a missing ${key} before the API starts`, () => {
      const config = { ...validConfig };
      delete config[key];

      expect(() => validateKeycloakConfig(config)).toThrow(key);
    });

    it(`rejects a blank ${key} before the API starts`, () => {
      expect(() =>
        validateKeycloakConfig({ ...validConfig, [key]: "  " }),
      ).toThrow(key);
    });
  }
});
