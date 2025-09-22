// This file is added here just to test the deletion of the user on keycloak since the jest is set up in the apps/user folder
// As a future work, this needs to be restructured and put in the keycloak folder.
import { HttpModule, HttpService } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import { deleteAccountFromKeycloak, useGetToken } from "@packages/keycloak";
import dotenv from "dotenv";

dotenv.config();

describe("Test deleteAccountFromKeycloak", () => {
  let http: HttpService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    http = moduleRef.get<HttpService>(HttpService);
  });

  it("should be able to delete a user account from Keycloak", async () => {
    const { getToken } = useGetToken(); // getToken is a function
    const email = "test@greenstand.org";

    const result = await deleteAccountFromKeycloak(http, getToken, email);
    expect(result).toBe(true);
  });
});
