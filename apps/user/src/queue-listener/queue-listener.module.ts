import { Module } from "@nestjs/common";
import { QueueListenerService } from "./queue-listener.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule], // Import HTTP module for API calls
  providers: [QueueListenerService], // Register the service
  exports: [QueueListenerService], // Export if other modules need it
})
export class QueueModule {}
