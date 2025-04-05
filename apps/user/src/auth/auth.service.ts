import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

type KeycloakResponse = {
  data: { access_token: string; expires_in: number };
};

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  private bearerToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  public async getToken(): Promise<string> {
    // If no token or token is expired, refresh it
    if (!this.bearerToken || this.isTokenExpired()) {
      await this.fetchTokenFromKeycloak();
    }
    return this.bearerToken;
  }

  private async fetchTokenFromKeycloak() {
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;
    const tokenApi = `${keycloakBaseUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      client_id: process.env.PRIVATE_KEYCLOAK_CLIENT_ID,
      client_secret: process.env.PRIVATE_KEYCLOAK_CLIENT_SECRET,
      grant_type: "client_credentials",
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    try {
      const response: KeycloakResponse = await firstValueFrom(
        this.httpService.post(tokenApi, body, { headers }),
      );

      this.bearerToken = response?.data?.access_token;
      this.tokenExpiresAt = Date.now() * response?.data?.expires_in * 1000;

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

  private isTokenExpired(): boolean {
    if (!this.tokenExpiresAt) {
      return true;
    }
    return Date.now() >= this.tokenExpiresAt;
  }
}
