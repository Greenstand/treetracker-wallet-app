import { http, HttpResponse } from "msw";
import { server } from "@treetracker/msw/src/server";
import { fetchTokenFromKeycloak } from "@treetracker/keycloak";
import { createWallet } from "../src";
import { Wallet } from "../src/types/wallet";

jest.mock("../src/utils/config", () => ({
  TREETRACKER_WALLET_API: "http://mock.wallet",
}));

jest.mock("../../keycloak/src/utils/config", () => ({
  KEYCLOAK_TOKEN_URL:
    "http://mock.keycloak/realms/test/protocol/openid-connect/token",
  KEYCLOAK_CLIENT_ID: "mock-client",
  KEYCLOAK_CLIENT_SECRET: "mock-secret",
}));

describe("createWallet", () => {
  let authToken: string;

  beforeAll(async () => {
    server.listen({ onUnhandledRequest: "error" });
    const { access_token } = await fetchTokenFromKeycloak();
    authToken = access_token;
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should create a wallet", async () => {
    const walletData: Wallet = {
      name: "TestWallet",
      about: "Test wallet",
    };

    const result = await createWallet(walletData, authToken);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name", walletData.name);
  });

  it("should throw on API error", async () => {
    server.use(
      http.post("*/wallets", () =>
        HttpResponse.json({ message: "Invalid wallet name" }, { status: 422 }),
      ),
    );

    await expect(
      createWallet({ name: "", about: "Test" }, authToken),
    ).rejects.toThrow("Invalid wallet name");
  });
});
