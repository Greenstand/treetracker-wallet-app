import { RegisterUserDto } from "@dtos/register-user.dto";
import { UserDto } from "@dtos/user.dto";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { firstValueFrom } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
  ) {}

  public async loginUser(loginUserDto) {
    if (!loginUserDto.username || !loginUserDto.password) {
      throw new HttpException("Missing credentials", HttpStatus.BAD_REQUEST);
    }

    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;
    const tokenUrl = `${keycloakBaseUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: "password",
      client_id: process.env.PRIVATE_KEYCLOAK_CLIENT_ID!,
      ...loginUserDto,
    });

    if (process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET) {
      body.append("client_secret", process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET);
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(tokenUrl, body.toString(), { headers }),
      );

      const { access_token } = response.data;

      if (!access_token) {
        throw new HttpException(
          "No access token returned",
          HttpStatus.UNAUTHORIZED,
        );
      }
      return { access_token };
    } catch (error: any) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data?.error_description ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";

      Logger.error(
        `User login failed (HTTP ${status}): ${message}`,
        undefined,
        UserService.name,
      );

      throw new HttpException(message, status);
    }
  }

  public async createUser(userData: RegisterUserDto) {
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;
    try {
      // Get the access token
      const tokenData = await this.authService.getToken();

      // API for creating the user
      const createUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users`;

      const headers = {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
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
            type: "password",
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
        return { success: true, message: "User created successfully!" };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.message;
      if (error.status === 409) {
        // user already exists
        throw new HttpException(errorMessage, 409);
      } else {
        // Logger.error(errorMessage);
        throw new HttpException(
          "Error creating user",
          HttpStatusCode.Forbidden,
        );
      }
    }
  }

  public async deleteAccount(userData: UserDto) {
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;

    try {
      // Step 1: Get access token
      const tokenData = await this.authService.getToken();
      const headers = {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      };

      // Step 2: Lookup user by username (email)
      const getUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users?email=${userData.email}`;
      const users = await firstValueFrom(
        this.httpService.get(getUserApiUrl, { headers }),
      );

      const userId = users.data[0]?.id;
      if (!userId) {
        return { success: false, message: "User not found" };
      }

      // Step 3: DELETE the user
      const deleteUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users/${userId}`;
      const response = await firstValueFrom(
        this.httpService.delete(deleteUserApiUrl, { headers }),
      );

      if (response?.status === 204) {
        return { success: true, message: "User deleted successfully!" };
      } else {
        return {
          success: false,
          message: `Unexpected response: ${response.status}`,
        };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.message;

      if (error.response?.status === 404) {
        return { success: false, message: "User not found" };
      } else if (error.response?.status === 403) {
        throw new HttpException("Unauthorized to delete user", 403);
      } else {
        throw new HttpException(errorMessage || "Error deleting user", 500);
      }
    }
  }
}
