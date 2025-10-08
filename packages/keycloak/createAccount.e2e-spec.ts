/// <reference types="jest" />

/**
 * E2E test for createAccount() with real Keycloak calls.
 *
 * Important:
 *  - This file explicitly loads the repo root .env (so run from packages/keycloak works)
 *  - Make sure your root .env contains:
 *      PRIVATE_KEYCLOAK_BASE_URL=http://localhost:8080
 *      PRIVATE_KEYCLOAK_REALM=test-realm
 *      PRIVATE_KEYCLOAK_CLIENT_SECRET=secret
 *      DATABASE_URL=...
 *
 *  - Ensure there are NO spaces around '=' in .env values.
 */
import * as path from "path";
// import path from 'path';

import * as dotenv from "dotenv";

import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule, HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { createAccount, CreateAccountDto } from "./createAccount";

// Load .env from repo root (two levels up from packages/keycloak)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Trim env values in case .env accidentally included spaces
if (process.env.PRIVATE_KEYCLOAK_BASE_URL) {
  process.env.PRIVATE_KEYCLOAK_BASE_URL =
    process.env.PRIVATE_KEYCLOAK_BASE_URL.trim();
}
if (process.env.PRIVATE_KEYCLOAK_REALM) {
  process.env.PRIVATE_KEYCLOAK_REALM =
    process.env.PRIVATE_KEYCLOAK_REALM.trim();
}
if (process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET) {
  process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET =
    process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET.trim();
}

/**
 * Helper: check basic env validity and throw informative error early
 */
function assertKeycloakEnv() {
  const base = process.env.PRIVATE_KEYCLOAK_BASE_URL;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM;
  const secret = process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET;

  if (!base || !realm || !secret) {
    throw new Error(
      `Missing Keycloak env. Required: PRIVATE_KEYCLOAK_BASE_URL, PRIVATE_KEYCLOAK_REALM, PRIVATE_KEYCLOAK_CLIENT_SECRET. ` +
        `Current values -> base: ${!!base}, realm: ${!!realm}, secret: ${!!secret}`,
    );
  }
}

/**
 * Request an admin token using client_credentials and the provided secret.
 * Throws a helpful error if env is missing.
 */
async function getToken(): Promise<string> {
  assertKeycloakEnv();

  const httpService = new HttpService();
  const url = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/protocol/openid-connect/token`;

  // sanity check url
  try {
    new URL(url);
  } catch (err) {
    throw new Error(`Constructed token URL is invalid: ${url}`);
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "admin-cli",
    client_secret: process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET!,
  });

  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  const response = await firstValueFrom(
    httpService.post(url, body.toString(), { headers }),
  );
  if (!response?.data?.access_token) {
    throw new Error("Failed to get access token from Keycloak");
  }
  return response.data.access_token;
}

/**
 * Delete a user by username if it exists. Used for test cleanup.
 */
async function deleteUser(username: string) {
  // if env missing, skip gracefully (prevents throwing when user purposely deleted env)
  assertKeycloakEnv();

  const token = await getToken();
  const httpService = new HttpService();

  const searchUrl = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/admin/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/users?username=${encodeURIComponent(username)}`;

  const usersRes = await firstValueFrom(
    httpService.get(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
  const users = usersRes.data || [];

  if (users.length) {
    const userId = users[0].id;
    const deleteUrl = `${process.env.PRIVATE_KEYCLOAK_BASE_URL}/admin/realms/${process.env.PRIVATE_KEYCLOAK_REALM}/users/${userId}`;
    await firstValueFrom(
      httpService.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  }
}

describe("createAccount E2E Test", () => {
  let httpService: HttpService;

  beforeAll(async () => {
    // ensure environment is available and valid for tests that need it
    if (
      !process.env.PRIVATE_KEYCLOAK_BASE_URL ||
      !process.env.PRIVATE_KEYCLOAK_REALM
    ) {
      // set sane defaults if you want local testing convenience (optional)
      // process.env.PRIVATE_KEYCLOAK_BASE_URL = 'http://localhost:8080';
      // process.env.PRIVATE_KEYCLOAK_REALM = 'test-realm';
      // Note: prefer to set these in the .env file instead of here.
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
  });

  afterAll(async () => {
    // nothing global to tear down here
  });

  it("should successfully create a new user account", async () => {
    assertKeycloakEnv(); // make sure env present

    const unique = `testuser_${Date.now()}`; // randomized to avoid collisions
    const userData: CreateAccountDto = {
      username: unique,
      email: `${unique}@example.com`,
      firstName: "Test",
      lastName: "User",
      password: "testPassword123",
    };

    // Clean up before test in case user exists
    await deleteUser(userData.username);

    const result = await createAccount(userData, httpService, getToken);
    expect(result.success).toBe(true);
    expect(result.message).toBe("User created successfully!");

    // Clean up after test
    await deleteUser(userData.username);
  });

  it("should throw error when user already exists (409)", async () => {
    assertKeycloakEnv();

    const unique = `existinguser_${Date.now()}`;
    const userData: CreateAccountDto = {
      username: unique,
      email: `${unique}@example.com`,
      firstName: "Existing",
      lastName: "User",
      password: "testPassword123",
    };

    // Ensure user exists
    await deleteUser(userData.username);
    await createAccount(userData, httpService, getToken);

    // Try creating again -> should throw conflict
    await expect(
      createAccount(userData, httpService, getToken),
    ).rejects.toThrow(/exists|already/i);

    // Cleanup
    await deleteUser(userData.username);
  });

  it("should throw error when missing required environment variables", async () => {
    // save and delete required env vars
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
      createAccount(userData, httpService, getToken),
    ).rejects.toThrow("Keycloak configuration is missing");

    // restore env
    if (savedBase) process.env.PRIVATE_KEYCLOAK_BASE_URL = savedBase;
    if (savedRealm) process.env.PRIVATE_KEYCLOAK_REALM = savedRealm;
  });

  it("should throw error when forbidden (insufficient permissions - 403)", async () => {
    assertKeycloakEnv();

    const userData: CreateAccountDto = {
      username: `forbidden_${Date.now()}`,
      email: `forbidden_${Date.now()}@example.com`,
      firstName: "Forbidden",
      lastName: "User",
      password: "testPassword123",
    };

    // Provide an invalid token function but keep env present so createAccount reaches Keycloak
    const invalidToken = async () => "invalid-token";

    await expect(
      createAccount(userData, httpService, invalidToken),
    ).rejects.toThrow(/Forbidden|Insufficient permissions/i);
  });
});
