import { HttpModule, HttpService } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import dotenv from "dotenv";
import { deleteAccountFromKeycloak, useGetToken } from "../../src";

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
