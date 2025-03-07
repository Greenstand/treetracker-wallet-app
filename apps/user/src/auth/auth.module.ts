import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule], // Import HTTP module for API calls
  providers: [AuthService], // Register the service
  exports: [AuthService], // Export if other modules need it
})
export class AuthModule {}
