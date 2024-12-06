import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from '@dtos/register-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpStatusCode } from 'axios';

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(private readonly httpService: HttpService) {}

  private async getToken() {
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;
    const tokenApi = `${keycloakBaseUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      client_id: process.env.PRIVATE_KEYCLOAK_CLIENT_ID,
      client_secret: process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(tokenApi, body, { headers }),
      );

      return response?.data?.access_token;
    } catch (e) {
      Logger.error(
        `logger: keycloak service account auth returned with ${e.response.status}, ${e.response.data.error_description}, `,
      );

      throw new HttpException(
        `Service account failed to authenticate`,
        e.response.status,
      );
    }
  }

  public async createUser(userData: RegisterUserDto) {
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;
    try {
      // Get the access token
      const tokenData = await this.getToken();

      // API for creating the user
      const createUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users`;

      const headers = {
        Authorization: `Bearer ${tokenData}`,
        'Content-Type': 'application/json',
      };
      const body = JSON.stringify({
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        enabled: true,
        emailVerified: false,
        credentials: [
          {
            type: 'password',
            value: userData.password,
            temporary: false,
          },
        ],
      });

      const response = await firstValueFrom(
        this.httpService.post(createUserApiUrl, body, {
          headers,
        }),
      );
      // Check if response is valid
      if (response?.status === 201) {
        return { success: true, message: 'User created successfully!' };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.message;
      if (error.status === 409) {
        // user already exists
        throw new HttpException(errorMessage, 409);
      } else {
        // Logger.error(errorMessage);
        throw new HttpException(
          'Error creating user',
          HttpStatusCode.Forbidden,
        );
      }
    }
  }
}
