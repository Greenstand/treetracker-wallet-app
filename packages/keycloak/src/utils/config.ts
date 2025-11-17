import "dotenv/config";

let KEYCLOAK_BASE_URL: string = "";
let KEYCLOAK_REALM: string = "";
let KEYCLOAK_CLIENT_ID: string = "";
let KEYCLOAK_CLIENT_SECRET: string = "";
let KEYCLOAK_TOKEN_URL: string = "";

const isNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

if (!isNative) {
  KEYCLOAK_BASE_URL = process.env.PRIVATE_KEYCLOAK_BASE_URL ?? "";
  KEYCLOAK_REALM = process.env.PRIVATE_KEYCLOAK_REALM ?? "";
  KEYCLOAK_CLIENT_ID = process.env.PRIVATE_KEYCLOAK_CLIENT_ID ?? "";
  KEYCLOAK_CLIENT_SECRET = process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET ?? "";
  KEYCLOAK_TOKEN_URL = `${KEYCLOAK_BASE_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
} else {
  const Constants = require("expo-constants").default;
  KEYCLOAK_BASE_URL =
    Constants.expoConfig?.extra?.keycloakBaseUrl ??
    Constants.manifest?.extra?.keycloakBaseUrl ??
    "";
  KEYCLOAK_REALM =
    Constants.expoConfig?.extra?.keycloakRealm ??
    Constants.manifest?.extra?.keycloakRealm ??
    "";
  KEYCLOAK_CLIENT_ID =
    Constants.expoConfig?.extra?.keycloakClientId ??
    Constants.manifest?.extra?.keycloakClientId ??
    "";
  KEYCLOAK_CLIENT_SECRET =
    Constants.expoConfig?.extra?.keycloakClientSecret ??
    Constants.manifest?.extra?.keycloakClientSecret ??
    "";
  KEYCLOAK_TOKEN_URL = `${KEYCLOAK_BASE_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
}

export {
  KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_TOKEN_URL,
};
