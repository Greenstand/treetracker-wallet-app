import { RegisterUserDto } from "@dtos/register-user.dto";
import { Test, TestingModule } from "@nestjs/testing";
import * as keycloak from "@packages/keycloak";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            loginUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe("register", () => {
    it("should call UserService.register with the correct data", async () => {
      const registerUserDto: RegisterUserDto = {
        username: "testuser",
        password: "password123",
        email: "test@example.com",
        firstName: "firstname",
        lastName: "lastname",
      };
      const result = { success: true, message: "message" };

      jest.spyOn(userService, "createUser").mockResolvedValue(result);

      const response = await userController.registerUser(registerUserDto);

      expect(userService.createUser).toHaveBeenCalledWith(registerUserDto);
      expect(response).toEqual(result);
    });
  });

  describe("login", () => {
    it("should call UserService.loginUser with correct credentials", async () => {
      const credentials = {
        username: "testuser",
        password: "password123",
      };
      const accessToken = "mocked-access-token";

      jest
        .spyOn(userService, "loginUser")
        .mockResolvedValue({ access_token: accessToken });

      const result = await userController.loginUser(credentials);

      expect(userService.loginUser).toHaveBeenCalledWith({
        username: credentials.username,
        password: credentials.password,
      });
      expect(result).toEqual({ access_token: accessToken });
    });
  });

  describe("delete", () => {
    it("should call deleteAccountFromKeycloak with the correct email", async () => {
      const userDto = { email: "testuser_1752112907878@wallet-app-test.com" };
      const deleteAccountSpy = jest
        .spyOn(keycloak, "deleteAccountFromKeycloak")
        .mockResolvedValue({
          success: true,
          message: "User deleted successfully",
        });

      await userController.deleteUser(userDto as any);

      expect(deleteAccountSpy).toHaveBeenCalledWith(userDto.email);
    });
  });
});
