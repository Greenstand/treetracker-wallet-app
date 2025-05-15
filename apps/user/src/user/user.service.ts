import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { RegisterUserDto } from "@dtos/register-user.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { HttpStatusCode } from "axios";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  // private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
  ) {}

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
}
