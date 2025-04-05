import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { HttpService } from "@nestjs/axios";
import { HttpException } from "@nestjs/common";
import { of, throwError } from "rxjs";

describe("AuthService", () => {
  let authService: AuthService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);

    process.env.PRIVATE_KEYCLOAK_BASE_URL = "http://mock-keycloak.com";
    process.env.PRIVATE_KEYCLOAK_REALM = "treetracker";
    process.env.PRIVATE_KEYCLOAK_CLIENT_ID = "mock-client-id";
    process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET = "MOCKCLIENTSECRET";
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch a new token if none is cached", async () => {
    (httpService.post as jest.Mock).mockReturnValue(
      of({
        data: {
          access_token: "mockedAccessToken",
          expires_in: 3600,
        },
      }),
    );

    const token = await authService.getToken();
    expect(token).toBe("mockedAccessToken");
    expect(httpService.post).toHaveBeenCalledTimes(1);
  });

  it("should use the cached token if it is not expired", async () => {
    (authService as any).bearerToken = "alreadyCachedToken";
    (authService as any).tokenExpiresAt = Date.now() + 100000; // not expired

    const token = await authService.getToken();
    expect(token).toBe("alreadyCachedToken");
    expect(httpService.post).not.toHaveBeenCalled();
  });

  it("should fetch a new token if the cached token is expired", async () => {
    (authService as any).bearerToken = "alreadyCachedToken";
    (authService as any).tokenExpiresAt = Date.now() - 100; // expired

    (httpService.post as jest.Mock).mockReturnValue(
      of({
        data: {
          access_token: "newAccessToken",
          expires_in: 3600,
        },
      }),
    );

    const token = await authService.getToken();
    expect(token).toBe("newAccessToken");
    expect(httpService.post).toHaveBeenCalledTimes(1);
  });

  it("should throw HttpException if Keycloak returns an error", async () => {
    (httpService.post as jest.Mock).mockReturnValue(
      throwError(() => {
        const error: any = new Error("Keycloak Error");
        error.response = {
          status: 401,
          data: {
            error_description: "invalid_client",
          },
        };
        return error;
      }),
    );

    await expect(authService.getToken()).rejects.toThrow(HttpException);
    expect(httpService.post).toHaveBeenCalledTimes(1);
  });
});
