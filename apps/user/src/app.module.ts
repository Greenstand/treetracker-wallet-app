import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as dotenv from "dotenv";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { QueueModule } from "./queue-listener/queue-listener.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

dotenv.config();

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UserModule,
    HttpModule,
    QueueModule,
    ConfigModule.forRoot({ envFilePath: ENV === "dev" ? ".dev.env" : ".env" }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class AppModule {}
