import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "@dtos/register-user.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @Get("test")
  check(@Body() registerUserDto: RegisterUserDto) {
    return "tree growing!!";
  }
}
