import { Module } from "@nestjs/common";
import * as dotenv from "dotenv";
import { UserModule } from "./user/user.module";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

dotenv.config();

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UserModule,
    HttpModule,
    ConfigModule.forRoot({ envFilePath: ENV === "dev" ? ".dev.env" : ".env" }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
