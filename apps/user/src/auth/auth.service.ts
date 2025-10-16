import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { fetchTokenFromKeycloak } from "@treetracker/keycloak";

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  private bearerToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  private isExpired(): boolean {
    return !this.tokenExpiresAt || Date.now() >= this.tokenExpiresAt;
  }

  /**
   * Returns a cached service-account token.
   * Refreshes from Keycloak when missing/expired.
   */
  public async getToken(): Promise<string> {
    if (!this.bearerToken || this.isExpired()) {
      const { access_token, tokenExpiresAt } = await fetchTokenFromKeycloak();
      this.bearerToken = access_token;
      this.tokenExpiresAt = tokenExpiresAt;
    }
    return this.bearerToken!;
  }
}
