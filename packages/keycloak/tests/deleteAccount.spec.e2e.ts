import { HttpService } from "@nestjs/axios";
import { KeycloakService } from "@packages/keycloak";
import dotenv from "dotenv";

dotenv.config();

describe("Test deleteAccountFromKeycloak", () => {
  let keycloakService: KeycloakService;
  let httpService: HttpService;

  beforeAll(() => {
    httpService = new HttpService();
    keycloakService = new KeycloakService(httpService);
  });

  it("should be able to delete a user account from Keycloak", async () => {
    const email = "testuser_1752112709800@wallet-app-test.com";

    const result = await keycloakService.deleteAccountFromKeycloak(email);
    expect(result.success).toBe(true);
  });
});
