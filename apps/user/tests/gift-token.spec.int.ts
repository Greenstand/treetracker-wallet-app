import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule } from "@nestjs/axios";
import { HttpStatus, INestApplication } from "@nestjs/common";
import supertest from "supertest";
import { UserModule } from "../src/user/user.module";
import { generateGiftToken } from "../../../packages/keycloak/generateGiftToken";
import { sendEmail } from "../../../packages/common/sendEmail";

// Mock the external dependencies
jest.mock("../../../packages/keycloak/generateGiftToken", () => ({
  generateGiftToken: jest.fn(),
}));

jest.mock("../../../packages/common/sendEmail", () => ({
  sendEmail: jest.fn(),
}));

describe("Gift Token Integration Tests", () => {
  let app: INestApplication;

  // Get typed references to mocked functions
  const mockGenerateGiftToken = generateGiftToken as jest.MockedFunction<
    typeof generateGiftToken
  >;
  const mockSendEmail = sendEmail as jest.MockedFunction<typeof sendEmail>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up default environment variable for SMTP
    process.env.SMTP_HOST = "smtp.test.com";
  });

  describe("POST /gift-token", () => {
    it("should send a gift token successfully", async () => {
      // Arrange
      const giftTokenDto = {
        email: "friend@example.com",
        tokenId: "token-123",
      };

      const mockGiftToken = "mock-gift-token-string-abc123";
      mockGenerateGiftToken.mockReturnValue(mockGiftToken);
      mockSendEmail.mockResolvedValue(undefined);

      // Act
      const response = await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.OK);

      // Assert
      expect(response.body).toBeDefined();

      // Verify generateGiftToken was called with correct parameters
      expect(mockGenerateGiftToken).toHaveBeenCalledTimes(1);
      const generateCall = mockGenerateGiftToken.mock.calls[0];
      expect(generateCall[0]).toBeInstanceOf(Date); // expiresAt should be a Date
      expect(generateCall[1]).toMatchObject({
        tokenId: giftTokenDto.tokenId,
        recipientEmailAddress: giftTokenDto.email,
        senderWalletId: expect.any(String),
      });

      // Verify sendEmail was called with correct parameters
      expect(mockSendEmail).toHaveBeenCalledTimes(1);
      const emailCall = mockSendEmail.mock.calls[0];
      expect(emailCall[0]).toBe(giftTokenDto.email); // to
      expect(emailCall[1]).toBeTruthy(); // subject (any non-empty string)
      expect(emailCall[2]).toContain(mockGiftToken); // body should contain the token
      expect(emailCall[3]).toEqual({
        smtpHost: "smtp.test.com",
      });
    });

    it("should return 400 when email is missing", async () => {
      const giftTokenDto = {
        tokenId: "token-123",
        // email is missing
      };

      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.BAD_REQUEST);

      // Functions should not be called if validation fails
      expect(mockGenerateGiftToken).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("should return 400 when tokenId is missing", async () => {
      const giftTokenDto = {
        email: "friend@example.com",
        // tokenId is missing
      };

      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.BAD_REQUEST);

      expect(mockGenerateGiftToken).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("should return 400 when email format is invalid", async () => {
      const giftTokenDto = {
        email: "invalid-email-format", // Not a valid email
        tokenId: "token-123",
      };

      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.BAD_REQUEST);

      expect(mockGenerateGiftToken).not.toHaveBeenCalled();
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("should return 500 when sendEmail fails", async () => {
      const giftTokenDto = {
        email: "friend@example.com",
        tokenId: "token-123",
      };

      mockGenerateGiftToken.mockReturnValue("mock-token");
      mockSendEmail.mockRejectedValue(new Error("SMTP connection failed"));

      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      // generateGiftToken should still be called before the error
      expect(mockGenerateGiftToken).toHaveBeenCalledTimes(1);
      expect(mockSendEmail).toHaveBeenCalledTimes(1);
    });

    it("should return 500 when generateGiftToken fails", async () => {
      const giftTokenDto = {
        email: "friend@example.com",
        tokenId: "token-123",
      };

      mockGenerateGiftToken.mockImplementation(() => {
        throw new Error("Token generation failed");
      });

      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      // sendEmail should not be called if token generation fails
      expect(mockGenerateGiftToken).toHaveBeenCalledTimes(1);
      expect(mockSendEmail).not.toHaveBeenCalled();
    });
  });

  describe("GET /gift-token", () => {
    it("should return empty array when no gift tokens have been sent", async () => {
      const response = await supertest(app.getHttpServer())
        .get("/gift-token")
        .expect(HttpStatus.OK);

      expect(response.body).toEqual([]);
    });

    it("should return all gift tokens that have been sent", async () => {
      // Send first gift token
      const giftTokenDto1 = {
        email: "friend1@example.com",
        tokenId: "token-1",
      };

      mockGenerateGiftToken.mockReturnValue("mock-token-1");
      mockSendEmail.mockResolvedValue(undefined);

      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto1)
        .expect(HttpStatus.OK);

      // Small delay to ensure different timestamps
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Send second gift token
      const giftTokenDto2 = {
        email: "friend2@example.com",
        tokenId: "token-2",
      };

      mockGenerateGiftToken.mockReturnValue("mock-token-2");
      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto2)
        .expect(HttpStatus.OK);

      // Get all gift tokens
      const response = await supertest(app.getHttpServer())
        .get("/gift-token")
        .expect(HttpStatus.OK);

      // Verify response structure
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);

      // Verify first gift token
      expect(response.body[0]).toMatchObject({
        email: giftTokenDto1.email,
        tokenId: giftTokenDto1.tokenId,
      });
      expect(response.body[0]).toHaveProperty("createdAt");
      const createdAt1 = new Date(response.body[0].createdAt);
      expect(createdAt1.getTime()).not.toBeNaN(); // Valid date check

      // Verify second gift token
      expect(response.body[1]).toMatchObject({
        email: giftTokenDto2.email,
        tokenId: giftTokenDto2.tokenId,
      });
      expect(response.body[1]).toHaveProperty("createdAt");
      const createdAt2 = new Date(response.body[1].createdAt);
      expect(createdAt2.getTime()).not.toBeNaN(); // Valid date check
    });

    it("should return gift tokens with correct ISO 8601 date-time format", async () => {
      const giftTokenDto = {
        email: "friend@example.com",
        tokenId: "token-123",
      };

      mockGenerateGiftToken.mockReturnValue("mock-token");
      mockSendEmail.mockResolvedValue(undefined);

      // Send a gift token
      await supertest(app.getHttpServer())
        .post("/gift-token")
        .send(giftTokenDto)
        .expect(HttpStatus.OK);

      // Get gift tokens
      const response = await supertest(app.getHttpServer())
        .get("/gift-token")
        .expect(HttpStatus.OK);

      expect(response.body.length).toBeGreaterThan(0);
      const giftToken = response.body[0];

      // Verify createdAt is a valid ISO 8601 date-time string
      // Format: YYYY-MM-DDTHH:mm:ss.sssZ
      expect(giftToken.createdAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );

      // Verify it can be parsed as a valid date
      const parsedDate = new Date(giftToken.createdAt);
      expect(parsedDate.getTime()).not.toBeNaN();
      expect(parsedDate.toISOString()).toBe(giftToken.createdAt);
    });
  });
});
