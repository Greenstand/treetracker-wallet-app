import { http, HttpResponse } from "msw";

export const mockKeycloakToken = {
  access_token: "mock-keycloak-access-token",
  expires_in: 3600,
  token_type: "Bearer",
  scope: "openid",
};

// Matches the standard Keycloak token endpoint path pattern
export const keycloakHandlers = [
  http.post("*/openid-connect/token", () =>
    HttpResponse.json(mockKeycloakToken),
  ),
];
