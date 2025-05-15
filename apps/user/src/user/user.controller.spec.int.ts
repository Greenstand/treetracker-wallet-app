import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule } from "@nestjs/axios";
import { HttpException, HttpStatus, INestApplication } from "@nestjs/common";
import supertest from "supertest";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { UserModule } from "./user.module";

describe("User Registration Integration Tests", () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, UserModule],
    })
      .overrideProvider(UserService)
      .useValue({
        createUser: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    const mockToken = "mock-token";
    const mockResponse = {
      success: true,
      message: "User created successfully!",
    };

    jest.spyOn(authService, "getToken").mockResolvedValue(mockToken);
    jest.spyOn(userService, "createUser").mockResolvedValue(mockResponse);

    const registerUserDto = {
      username: "testuser",
      email: "testuser@example.com",
      firstName: "Test",
      lastName: "User",
      password: "securepassword123",
    };

    await supertest(app.getHttpServer())
      .post("/register")
      .send(registerUserDto)
      .expect(HttpStatus.CREATED)
      .expect(response => {
        expect(response.body).toEqual(mockResponse);
      });
  });

  it("should return 409 if user already exists", async () => {
    const mockToken = "mock-token";
    const mockError = new HttpException(
      "User already exists",
      HttpStatus.CONFLICT,
    );

    jest.spyOn(authService, "getToken").mockResolvedValueOnce(mockToken);
    jest.spyOn(userService, "createUser").mockRejectedValue(mockError);

    const registerUserDto = {
      username: "existinguser",
      email: "existinguser@example.com",
      firstName: "Existing",
      lastName: "User",
      password: "securepassword123",
    };

    await supertest(app.getHttpServer())
      .post("/register")
      .send(registerUserDto)
      .expect(HttpStatus.CONFLICT)
      .expect(response => {
        expect(response.body.message).toBe("User already exists");
      });
  });

  it("should return 403 if token retrieval fails", async () => {
    const mockTokenError = "error getting token";

    const mockRegisterError = new HttpException(
      "Error creating user",
      HttpStatus.FORBIDDEN,
    );

    jest.spyOn(authService, "getToken").mockResolvedValueOnce(mockTokenError);
    jest.spyOn(userService, "createUser").mockRejectedValue(mockRegisterError);

    const registerUserDto = {
      username: "testuser",
      email: "testuser@example.com",
      firstName: "Test",
      lastName: "User",
      password: "securepassword123",
    };

    await supertest(app.getHttpServer())
      .post("/register")
      .send(registerUserDto)
      .expect(HttpStatus.FORBIDDEN)
      .expect(response => {
        expect(response.body.message).toBe("Error creating user");
      });
  });

  it("should return 403 if user creation fails unexpectedly", async () => {
    const mockToken = "mock-token";
    const mockError = new HttpException(
      "Error creating user",
      HttpStatus.FORBIDDEN,
    );

    jest.spyOn(authService, "getToken").mockResolvedValue(mockToken);
    jest.spyOn(userService, "createUser").mockRejectedValue(mockError);

    const registerUserDto = {
      username: "anotheruser",
      email: "anotheruser@example.com",
      firstName: "Another",
      lastName: "User",
      password: "securepassword123",
    };

    await supertest(app.getHttpServer())
      .post("/register")
      .send(registerUserDto)
      .expect(HttpStatus.FORBIDDEN)
      .expect(response => {
        expect(response.body.message).toBe("Error creating user");
      });
  });
});
