import { deleteAccountFromKeycloak } from "@packages/keycloak";
import dotenv from "dotenv";

dotenv.config();

describe("deleteAccountFromKeycloak", () => {
  it("deletes a user account from Keycloak", async () => {
    const email = "testuser_1752717006933@wallet-app-test.com";
    const result = await deleteAccountFromKeycloak(email);

    expect(result.success).toBe(true);
  });
});
