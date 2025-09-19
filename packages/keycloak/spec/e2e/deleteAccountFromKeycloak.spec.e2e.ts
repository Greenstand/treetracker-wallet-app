import { deleteAccountFromKeycloak, useGetToken } from "../../src";
import dotenv from "dotenv";

// load env variables, but to avoid repeatly load in each file, do it in jest set up might be better
dotenv.config();

describe("Test deleteAccountFromKeycloak", () => {
  it("should be able to delete a user account from Keycloak", async () => {
    const getToken = useGetToken();

    await deleteAccountFromKeycloak("test@greenstand.org", getToken);
  });
});
