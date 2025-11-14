import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
