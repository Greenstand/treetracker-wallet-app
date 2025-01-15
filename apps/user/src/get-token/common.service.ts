import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

type TokenResponse = {
  data: { access_token: string };
};

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  async getToken() {
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
      const response: TokenResponse = await firstValueFrom(
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
}
