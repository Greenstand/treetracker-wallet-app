import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus } from "@nestjs/common";
import { of, throwError } from "rxjs";
import { RegisterUserDto } from "@dtos/register-user.dto";

describe("UserService - createUser", () => {
  let userService: UserService;
  let httpService: HttpService;
  let authService: AuthService;

  const registerUserDto: RegisterUserDto = {
    username: "testuser",
    email: "testuser@example.com",
    firstName: "Test",
    lastName: "User",
    password: "securepassword123",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            getToken: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    httpService = module.get<HttpService>(HttpService);
    authService = module.get<AuthService>(AuthService);

    process.env.PRIVATE_KEYCLOAK_BASE_URL = "http://mock-keycloak.com";
    process.env.PRIVATE_KEYCLOAK_REALM = "treetracker";
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a user successfully on a 201 response", async () => {
    (authService.getToken as jest.Mock).mockResolvedValue("mock-token");
    (httpService.post as jest.Mock).mockReturnValue(of({ status: 201 }));

    const result = await userService.createUser(registerUserDto);

    expect(result).toEqual({
      success: true,
      message: "User created successfully!",
    });
  });

  it("should throw BAD_GATEWAY when Keycloak returns an unexpected successful status", async () => {
    (authService.getToken as jest.Mock).mockResolvedValue("mock-token");
    (httpService.post as jest.Mock).mockReturnValue(of({ status: 200 }));

    await expect(userService.createUser(registerUserDto)).rejects.toMatchObject(
      {
        status: HttpStatus.BAD_GATEWAY,
      },
    );
  });

  it("should propagate an HttpException thrown by AuthService.getToken unchanged", async () => {
    const authError = new HttpException(
      "Service account failed to authenticate",
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    (authService.getToken as jest.Mock).mockRejectedValue(authError);

    await expect(userService.createUser(registerUserDto)).rejects.toBe(
      authError,
    );
  });

  it("should return CONFLICT (409) when Keycloak reports the user already exists", async () => {
    (authService.getToken as jest.Mock).mockResolvedValue("mock-token");
    (httpService.post as jest.Mock).mockReturnValue(
      throwError(() => {
        const error: any = new Error("Conflict");
        error.response = {
          status: 409,
          data: { errorMessage: "User already exists" },
        };
        return error;
      }),
    );

    await expect(userService.createUser(registerUserDto)).rejects.toMatchObject(
      {
        status: HttpStatus.CONFLICT,
      },
    );
  });

  it("should return BAD_REQUEST (400) rather than 403, preserving the error message", async () => {
    (authService.getToken as jest.Mock).mockResolvedValue("mock-token");
    (httpService.post as jest.Mock).mockReturnValue(
      throwError(() => {
        const error: any = new Error("Bad Request");
        error.response = {
          status: 400,
          data: { errorMessage: "Invalid user data" },
        };
        return error;
      }),
    );

    await expect(userService.createUser(registerUserDto)).rejects.toMatchObject(
      {
        status: HttpStatus.BAD_REQUEST,
        message: "Invalid user data",
      },
    );
  });

  it("should return the upstream 500 rather than 403", async () => {
    (authService.getToken as jest.Mock).mockResolvedValue("mock-token");
    (httpService.post as jest.Mock).mockReturnValue(
      throwError(() => {
        const error: any = new Error("Internal Server Error");
        error.response = { status: 500, data: {} };
        return error;
      }),
    );

    await expect(userService.createUser(registerUserDto)).rejects.toMatchObject(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    );
  });

  it("should fall back to INTERNAL_SERVER_ERROR on a network/timeout error with no response", async () => {
    (authService.getToken as jest.Mock).mockResolvedValue("mock-token");
    (httpService.post as jest.Mock).mockReturnValue(
      throwError(() => new Error("Network Error")),
    );

    await expect(userService.createUser(registerUserDto)).rejects.toMatchObject(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    );
  });
});
