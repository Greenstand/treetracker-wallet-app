// apps/wallets/tests/createWallet.spec.e2e.ts
import createWallet from "../src/api/createWallet";
import { Wallet } from "../src/types/wallet";
import "dotenv/config";

async function getUserToken() {
  const apiServer = process.env.USER_API_URL || "http://localhost:8080";
  const response = await fetch(`${apiServer}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: process.env.TEST_USER || "",
      password: process.env.TEST_PASSWORD || "",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to login: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.access_token;
}

describe("createWallet (e2e)", () => {
  let authToken: string;

  beforeAll(async () => {
    try {
      authToken = await getUserToken();
      console.log("Auth token obtained:", authToken ? "Yes" : "No");
    } catch (error) {
      console.error("Failed to get auth token:", error);
      throw error;
    }
  });

  beforeEach(() => {
    // Remove mock clearing for e2e tests
    // (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it("should create wallet successfully", async () => {
    const walletData: Wallet = {
      name: `TestWallet${Date.now()}`,
      about: "Test wallet for e2e testing",
    };

    const result = await createWallet(walletData, authToken);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("wallet", walletData.name);
  });

  it("should handle API errors", async () => {
    const invalidWalletData: Wallet = {
      name: "", // Invalid empty name
      about: "Test",
    };

    await expect(createWallet(invalidWalletData, authToken)).rejects.toThrow();
  });
});
