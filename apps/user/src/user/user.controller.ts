import { LoginUserDto } from "@dtos/login-user.dto";
import { RegisterUserDto } from "@dtos/register-user.dto";
import { UserDto } from "@dtos/user.dto";
import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  @HttpCode(200)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Post("register")
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  //Route to delete a user from keycloak
  @Post("delete")
  @HttpCode(204)
  async deleteUser(@Body() userDto: UserDto) {
    await this.userService.deleteAccount(userDto);
  }

  @Get("healthz")
  check(@Body() registerUserDto: RegisterUserDto) {
    return "tree growing!!";
  }
}
