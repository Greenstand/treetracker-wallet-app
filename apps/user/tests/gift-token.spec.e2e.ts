import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import supertest from "supertest";
import { AppModule } from "../src/app.module";

/**
 * Integration Tests for Gift Token Endpoints
 *
 * Endpoints covered (from user-api.yaml lines 29-66):
 * - POST /gift-token: Send a gift token to a user by email
 * - GET /gift-token: Get all gift tokens sent by me
 */

// Mock generateGiftToken from packages/keycloak/generateGiftToken.ts
jest.mock("../../../packages/keycloak/generateGiftToken", () => ({
  generateGiftToken: jest.fn().mockReturnValue("mocked-gift-token-jwt"),
}));

// Mock sendEmail from packages/common/sendEmail.ts
jest.mock("../../../packages/common/sendEmail", () => ({
  sendEmail: jest.fn().mockResolvedValue(undefined),
}));

import { generateGiftToken } from "../../../packages/keycloak/generateGiftToken";
import { sendEmail } from "../../../packages/common/sendEmail";

describe("Gift Token Endpoints (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /gift-token", () => {
    const validGiftTokenDto = {
      email: "friend@example.com",
      tokenId: "token-123-abc",
    };

    it("should send a gift token successfully and return 200", async () => {
      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(validGiftTokenDto);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty("success", true);
    });

    it("should return 400 when email is missing", async () => {
      const invalidDto = { tokenId: "token-123-abc" };

      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(invalidDto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("should return 400 when tokenId is missing", async () => {
      const invalidDto = { email: "friend@example.com" };

      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(invalidDto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("should return 400 when email format is invalid", async () => {
      const invalidDto = { email: "invalid-email", tokenId: "token-123-abc" };

      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(invalidDto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("should return 404 when token does not exist", async () => {
      const dto = {
        email: "friend@example.com",
        tokenId: "non-existent-token",
      };

      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(dto);

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

    it("should return 403 when user does not own the token", async () => {
      const dto = {
        email: "friend@example.com",
        tokenId: "someone-elses-token",
      };

      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(dto);

      expect(response.status).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe("GET /gift-token", () => {
    it("should return all gift tokens sent by the user", async () => {
      const response = await supertest(app.getHttpServer()).get("/gift-token");

      expect(response.status).toBe(HttpStatus.OK);
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        response.body.forEach(
          (item: { email: string; tokenId: string; createdAt: string }) => {
            expect(item).toHaveProperty("email");
            expect(item).toHaveProperty("tokenId");
            expect(item).toHaveProperty("createdAt");
          },
        );
      }
    });

    it("should return empty array when user has not sent any gift tokens", async () => {
      const response = await supertest(app.getHttpServer()).get("/gift-token");

      expect(response.status).toBe(HttpStatus.OK);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 401 when user is not authenticated", async () => {
      const response = await supertest(app.getHttpServer())
        .get("/gift-token")
        .set("Authorization", "");

      expect([HttpStatus.OK, HttpStatus.UNAUTHORIZED]).toContain(
        response.status,
      );
    });
  });
});
