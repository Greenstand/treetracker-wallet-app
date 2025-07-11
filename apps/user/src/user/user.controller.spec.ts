import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { RegisterUserDto } from "@dtos/register-user.dto";

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
});
