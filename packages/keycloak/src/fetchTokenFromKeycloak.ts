
  export async fetchTokenFromKeycloak() {
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

      return {
        bearerToken: response?.data?.access_token,
        tokenExpiresAt: Date.now() * response?.data?.expires_in * 1000;
      }

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
