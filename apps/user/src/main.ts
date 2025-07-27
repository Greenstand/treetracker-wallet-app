import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "@utils/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  const port = process.env.PORT || 8080;
  if (process.env.NODE_ENV !== "production") {
    setupSwagger(app);
  }

  const corsOptions = {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_ORIGINS?.split(",").map(origin => origin.trim())
        : process.env.CORS_ORIGINS_DEV?.split(",").map(origin =>
            origin.trim(),
          ) || [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000",
          ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  await app.listen(port, "0.0.0.0");
  Logger.log(
    `🚀 Application is running in ${
      process.env.NODE_ENV || "development"
    } mode on: http://localhost:${port}`,
  );
}

bootstrap().catch(err => {
  Logger.error(`Failed to start application: ${err.message}`);
  process.exit(1);
});
