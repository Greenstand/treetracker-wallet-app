import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "@dtos/register-user.dto";
import { LoginUserDto } from "@dtos/login-user.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  @HttpCode(200)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    // DEV ONLY: bypass Keycloak when MOCK_AUTH is enabled
    if (process.env.MOCK_AUTH === "true") {
      return { access_token: "x".repeat(128) };
    }
    return this.userService.loginUser(loginUserDto);
  }

  @Post("register")
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    // DEV ONLY: bypass Keycloak when MOCK_AUTH is enabled
    if (process.env.MOCK_AUTH === "true") {
      // shape expected by the web app
      return { success: true, message: "User created successfully!" };
    }
    return this.userService.createUser(registerUserDto);
  }

  @Get("healthz")
  check(@Body() registerUserDto: RegisterUserDto) {
    return "tree growing!!";
  }
}
