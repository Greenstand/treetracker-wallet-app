// test/cats.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
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

  it('should return 201 when a new user is succesfully created', () => {
    function generateUniqueUserData() {
      const timestamp = Date.now();
      return {
        username: `testuser_${timestamp}`,
        email: `testuser_${timestamp}@wallet-app-test.com`,
        password: 'SecurePassword123!',
        firstName: 'firstname',
        lastName: 'lastname',
      };
    }
    const newUser = generateUniqueUserData();
    return request(app.getHttpServer())
      .post('/register')
      .send(newUser)
      .expect(201)
      .expect({ success: true, message: 'User created successfully!' });
  });

  it('should return 409 when a user exists with same username', () => {
    function generateUniqueUserData() {
      const timestamp = Date.now();
      return {
        username: `testuser_${timestamp}`,
        email: `testuser_${timestamp}@wallet-app-test.com`,
        password: 'SecurePassword123!',
        firstName: 'firstname',
        lastName: 'lastname',
      };
    }
    const newUser = generateUniqueUserData();
    return request(app.getHttpServer())
      .post('/register')
      .send(newUser)
      .expect(201)
      .expect({ success: true, message: 'User created successfully!' });
  });
});
