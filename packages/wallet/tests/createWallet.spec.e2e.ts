// apps/wallets/tests/createWallet.spec.e2e.ts
import createWallet from "../src/api/createWallet";
import { Wallet } from "../src/types/wallet";
import { fetchTokenFromKeycloak } from "@treetracker/keycloak";

describe("createWallet (e2e)", () => {
  let authToken: string;

  beforeAll(async () => {
    try {
      const tokenResponse = await fetchTokenFromKeycloak();
      authToken = tokenResponse.access_token;
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
