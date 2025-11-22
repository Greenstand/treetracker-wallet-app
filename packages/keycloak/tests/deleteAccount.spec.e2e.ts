import { createUser } from "../src/api/createAccountFromKeycloak";
import { deleteAccountFromKeycloak } from "../src/api/deleteAccountFromKeycloak";
import { fetchTokenFromKeycloak } from "../src/api/fetchTokenFromKeycloak";

describe("deleteAccountFromKeycloak", () => {
  let userId: string;
  let accessToken: string;

  beforeAll(async () => {
    const token = await fetchTokenFromKeycloak();
    const password = Math.random().toString(36).substring(2, 15);
    const user = {
      username: "testuser",
      email: "testuser@example.com",
      password: password,
      firstName: "Test",
      lastName: "User",
    };
    userId = await createUser(user, token.access_token);
    accessToken = token.access_token;
  });

  it("should delete an account from Keycloak", async () => {
    const response = await deleteAccountFromKeycloak(accessToken, userId);
    expect(response.status).toBe(204);
  });
});
