import { Module } from "@nestjs/common";
import * as dotenv from "dotenv";
import { UserModule } from "./user/user.module";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { QueueListenerService } from "./queue-listener/queue-listener.service";
import { QueueModule } from "./queue-listener/queue-listener.module";

dotenv.config();

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UserModule,
    HttpModule,
    QueueModule,
    ConfigModule.forRoot({ envFilePath: ENV === "dev" ? ".dev.env" : ".env" }),
  ],
  controllers: [UserController],
  providers: [UserService, QueueListenerService],
})
export class AppModule {}
