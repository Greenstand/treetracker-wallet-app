/// <reference types="jest" />

import * as path from "path";
import * as dotenv from "dotenv";
import axios from "axios"; // Changed: Import axios directly
import { createAccount, CreateAccountDto } from "./createAccount";

// Load .env from repo root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Trim env values to remove accidental whitespace
[
  "PRIVATE_KEYCLOAK_BASE_URL",
  "PRIVATE_KEYCLOAK_REALM",
  "PRIVATE_KEYCLOAK_CLIENT_ID",
  "PRIVATE_KEYCLOAK_CLIENT_SECRET",
  "PRIVATE_KEYCLOAK_RESTRICTED_CLIENT_SECRET",
].forEach(key => {
  if (process.env[key]) process.env[key] = process.env[key]!.trim();
});

/** Ensure required Keycloak env exists */
function assertKeycloakEnv() {
  const required = [
    "PRIVATE_KEYCLOAK_BASE_URL",
    "PRIVATE_KEYCLOAK_REALM",
    "PRIVATE_KEYCLOAK_CLIENT_ID",
    "PRIVATE_KEYCLOAK_CLIENT_SECRET",
    "PRIVATE_KEYCLOAK_RESTRICTED_CLIENT_SECRET",
  ];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing Keycloak env variable: ${key}`);
    }
  }
}

/** Fetch admin token using client_credentials (using axios) */
// Changed: Function now uses plain axios
async function fetchAdminToken(): Promise<string> {
  assertKeycloakEnv();
  const url = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.PRIVATE_KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET!,
  });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  // Changed: Replaced HttpService post/firstValueFrom with axios.post
  const response = await axios.post(url, body.toString(), { headers });

  if (!response?.data?.access_token)
    throw new Error("Failed to get admin token from Keycloak");
  return response.data.access_token;
}

/** Fetch restricted token (no manage-users roles) for 403 test (using axios) */
// Changed: Function now uses plain axios
async function fetchRestrictedToken(): Promise<string> {
  assertKeycloakEnv();
  const url = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "restricted-client",
    client_secret: process.env.PRIVATE_KEYCLOAK_RESTRICTED_CLIENT_SECRET!,
  });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  // Changed: Replaced HttpService post/firstValueFrom with axios.post
  const response = await axios.post(url, body.toString(), { headers });

  if (!response?.data?.access_token)
    throw new Error("Failed to get restricted token from Keycloak");
  return response.data.access_token;
}

/** Delete user by username if exists (using axios) */
// Changed: Function now uses plain axios. Removed the httpService argument.
async function deleteUser(token: string, username: string) {
  const baseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL!;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM!;
  const searchUrl = `${baseUrl}/admin/realms/${realm}/users?username=${encodeURIComponent(username)}`;

  // Changed: Using axios.get
  const usersRes = await axios.get(searchUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const users = usersRes.data || [];

  if (users.length) {
    const deleteUrl = `${baseUrl}/admin/realms/${realm}/users/${users[0].id}`;
    // Changed: Using axios.delete
    await axios.delete(deleteUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

describe("createAccount E2E Test (Restructured with Axios)", () => {
  let adminToken: string; // Changed: Removed httpService variable

  beforeAll(async () => {
    assertKeycloakEnv();
    // Changed: Removed NestJS Test.createTestingModule logic

    adminToken = await fetchAdminToken(); // Fetch admin token directly
    console.log("✅ Admin token fetched for tests");
  });

  it("should successfully create a new user account", async () => {
    const unique = `testuser_${Date.now()}`;
    const userData: CreateAccountDto = {
      username: unique,
      email: `${unique}@example.com`,
      firstName: "Test",
      lastName: "User",
      password: "testPassword123",
    };

    // Changed: Removed httpService argument from deleteUser and createAccount
    await deleteUser(adminToken, userData.username);
    const result = await createAccount(userData, async () => adminToken);

    expect(result.success).toBe(true);
    expect(result.message).toBe("User created successfully!");
    await deleteUser(adminToken, userData.username);
  });

  it("should throw error when user already exists (409)", async () => {
    const unique = `existinguser_${Date.now()}`;
    const userData: CreateAccountDto = {
      username: unique,
      email: `${unique}@example.com`,
      firstName: "Existing",
      lastName: "User",
      password: "testPassword123",
    };

    await deleteUser(adminToken, userData.username);
    await createAccount(userData, async () => adminToken);

    await expect(
      createAccount(userData, async () => adminToken),
    ).rejects.toThrow(/exists|already/i);

    await deleteUser(adminToken, userData.username);
  });

  it("should throw error when missing required environment variables", async () => {
    const savedBase = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const savedRealm = process.env.PRIVATE_KEYCLOAK_REALM;

    delete process.env.PRIVATE_KEYCLOAK_BASE_URL;
    delete process.env.PRIVATE_KEYCLOAK_REALM;

    const userData: CreateAccountDto = {
      username: "testuser_missing_env",
      email: "missing@example.com",
      firstName: "Test",
      lastName: "User",
      password: "testPassword123",
    };

    await expect(
      createAccount(userData, async () => adminToken),
    ).rejects.toThrow("Keycloak configuration is missing");

    if (savedBase) process.env.PRIVATE_KEYCLOAK_BASE_URL = savedBase;
    if (savedRealm) process.env.PRIVATE_KEYCLOAK_REALM = savedRealm;
  });

  it("should throw error when forbidden (insufficient permissions - 403)", async () => {
    const userData: CreateAccountDto = {
      username: `forbidden_${Date.now()}`,
      email: `forbidden_${Date.now()}@example.com`,
      firstName: "Forbidden",
      lastName: "User",
      password: "testPassword123",
    };

    const restrictedToken = await fetchRestrictedToken();

    await expect(
      createAccount(userData, async () => restrictedToken),
    ).rejects.toThrow(/Forbidden|Insufficient permissions/i);
  });
});
