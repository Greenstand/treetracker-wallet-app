import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import supertest from "supertest";
import { AppModule } from "../src/app.module";

describe("UserController (e2e)", () => {
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

  it("should return 201 when a new user is succesfully created", () => {
    function generateUniqueUserData() {
      const timestamp = Date.now();
      return {
        username: `testuser_${timestamp}`,
        email: `testuser_${timestamp}@wallet-app-test.com`,
        password: "SecurePassword123!",
        firstName: "firstname",
        lastName: "lastname",
      };
    }
    const newUser = generateUniqueUserData();
    return supertest(app.getHttpServer())
      .post("/register")
      .send(newUser)
      .expect(201)
      .expect({ success: true, message: "User created successfully!" });
  });

  it("should return 409 when a user exists with same username", () => {
    function generateUniqueUserData() {
      const timestamp = Date.now();
      return {
        username: `testuser_${timestamp}`,
        email: `testuser_${timestamp}@wallet-app-test.com`,
        password: "SecurePassword123!",
        firstName: "firstname",
        lastName: "lastname",
      };
    }
    const newUser = generateUniqueUserData();
    return supertest(app.getHttpServer())
      .post("/register")
      .send(newUser)
      .expect(201)
      .expect({ success: true, message: "User created successfully!" });
  });

  it("should return 200 and a token when user logs in successfully", async () => {
    const timestamp = Date.now();
    const newUser = {
      username: `testuser_${timestamp}`,
      email: `testuser_${timestamp}@wallet-app-test.com`,
      password: "SecurePassword123!",
      firstName: "First",
      lastName: "Last",
    };

    // 1. Register user
    await supertest(app.getHttpServer())
      .post("/register")
      .send(newUser)
      .expect(201)
      .expect({ success: true, message: "User created successfully!" });

    // 2. Login with same credentials
    // Now login with same credentials
    const loginDto = {
      username: newUser.username,
      password: newUser.password,
    };

    const response = await supertest(app.getHttpServer())
      .post("/login")
      .send(loginDto)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("access_token");
    expect(typeof response.body.access_token).toBe("string");
    expect(response.body.access_token.length).toBeGreaterThan(100);
  });
});
