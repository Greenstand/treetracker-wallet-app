import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { getTokenManager } from "./getToken";

@Injectable()
export class KeycloakService {
  constructor(private readonly httpService: HttpService) {}

  public async deleteAccountFromKeycloak(email: string) {
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;

    try {
      // ✅ Get access token from useGetToken
      const { getToken } = getTokenManager();
      const tokenData = await getToken();

      // ✅ Build URLs
      const getUserUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users?email=${email}`;

      const headers = {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      };

      // ✅ Step 1: Get user ID by email
      const userResponse = await firstValueFrom(
        this.httpService.get(getUserUrl, { headers }),
      );

      if (!userResponse.data.length) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const userId = userResponse.data[0].id;
      const deleteUserUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users/${userId}`;

      // ✅ Step 2: Delete user by ID
      const deleteResponse = await firstValueFrom(
        this.httpService.delete(deleteUserUrl, { headers }),
      );

      if (deleteResponse.status === 204) {
        return { success: true, message: "User deleted successfully" };
      } else {
        throw new HttpException(
          "Failed to delete user",
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.message;
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
