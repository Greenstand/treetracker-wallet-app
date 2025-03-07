import { Module } from "@nestjs/common";
import { QueueListenerService } from "./queue-listener.service";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [HttpModule, AuthModule], // Import HTTP module for API calls
  providers: [QueueListenerService], // Register the service
  exports: [QueueListenerService], // Export if other modules need it
})
export class QueueModule {}
