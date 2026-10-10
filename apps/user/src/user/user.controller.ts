import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "@dtos/register-user.dto";
import { LoginUserDto } from "@dtos/login-user.dto";

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

  @Get("healthz")
  check() {
    return "tree growing!!";
  }

  @Get("me")
  async getMe(@Headers("authorization") authHeader?: string) {
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    if (!token) {
      throw new HttpException("Missing bearer token", HttpStatus.UNAUTHORIZED);
    }
    return this.userService.getMe(token);
  }
}
