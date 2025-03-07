import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
