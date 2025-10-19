/// <reference types="jest" />

import * as path from "path";
import * as dotenv from "dotenv";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule, HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
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

/** Fetch admin token using client_credentials */
async function fetchAdminToken(httpService: HttpService): Promise<string> {
  assertKeycloakEnv();
  const url = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.PRIVATE_KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET!,
  });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const response = await firstValueFrom(
    httpService.post(url, body.toString(), { headers }),
  );
  if (!response?.data?.access_token)
    throw new Error("Failed to get admin token from Keycloak");
  return response.data.access_token;
}

/** Fetch restricted token (no manage-users roles) for 403 test */
async function fetchRestrictedToken(httpService: HttpService): Promise<string> {
  assertKeycloakEnv();
  const url = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "restricted-client",
    client_secret: process.env.PRIVATE_KEYCLOAK_RESTRICTED_CLIENT_SECRET!,
  });
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const response = await firstValueFrom(
    httpService.post(url, body.toString(), { headers }),
  );
  if (!response?.data?.access_token)
    throw new Error("Failed to get restricted token from Keycloak");
  return response.data.access_token;
}

/** Delete user by username if exists */
async function deleteUser(
  httpService: HttpService,
  token: string,
  username: string,
) {
  const baseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL!;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM!;
  const searchUrl = `${baseUrl}/admin/realms/${realm}/users?username=${encodeURIComponent(username)}`;
  const usersRes = await firstValueFrom(
    httpService.get(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
  const users = usersRes.data || [];
  if (users.length) {
    const deleteUrl = `${baseUrl}/admin/realms/${realm}/users/${users[0].id}`;
    await firstValueFrom(
      httpService.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  }
}

describe("createAccount E2E Test", () => {
  let httpService: HttpService;
  let adminToken: string;

  beforeAll(async () => {
    assertKeycloakEnv();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();
    httpService = module.get<HttpService>(HttpService);

    adminToken = await fetchAdminToken(httpService);
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

    await deleteUser(httpService, adminToken, userData.username);
    const result = await createAccount(
      userData,
      httpService,
      async () => adminToken,
    );

    expect(result.success).toBe(true);
    expect(result.message).toBe("User created successfully!");
    await deleteUser(httpService, adminToken, userData.username);
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

    await deleteUser(httpService, adminToken, userData.username);
    await createAccount(userData, httpService, async () => adminToken);

    await expect(
      createAccount(userData, httpService, async () => adminToken),
    ).rejects.toThrow(/exists|already/i);

    await deleteUser(httpService, adminToken, userData.username);
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
      createAccount(userData, httpService, async () => adminToken),
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

    const restrictedToken = await fetchRestrictedToken(httpService);

    await expect(
      createAccount(userData, httpService, async () => restrictedToken),
    ).rejects.toThrow(/Forbidden|Insufficient permissions/i);
  });
});
