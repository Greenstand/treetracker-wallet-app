import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
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

    let response: KeycloakResponse;
    try {
      response = await firstValueFrom(
        this.httpService.post(tokenApi, body, { headers }),
      );
    } catch (e) {
      const status = e.response?.status || HttpStatus.SERVICE_UNAVAILABLE;
      const description =
        e.response?.data?.error_description || e.message || "Unknown error";

      Logger.error(
        `Keycloak service account auth failed: HTTP ${status} - ${description}`,
      );

      throw new HttpException(`Service account failed to authenticate`, status);
    }

    const token = response?.data?.access_token;
    if (typeof token !== "string" || !token.trim()) {
      Logger.error("Keycloak response did not include a usable access token");
      throw new HttpException(
        "Service account failed to authenticate",
        HttpStatus.BAD_GATEWAY,
      );
    }

    this.bearerToken = token;
    this.tokenExpiresAt = Date.now() + response?.data?.expires_in * 1000;

    return token;
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiresAt) {
      return true;
    }
    return Date.now() >= this.tokenExpiresAt;
  }
}
