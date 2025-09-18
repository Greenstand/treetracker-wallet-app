import { fetchTokenFromKeycloak } from './fetchTokenFromKeycloak';

export async function useGetToken(){
  bearerToken: string | null = null;
  tokenExpiresAt: number | null = null;

  function isTokenExpired(): boolean {
    if (!tokenExpiresAt) {
      return true;
    }
    return Date.now() >= tokenExpiresAt;
  }

  public async getToken(): Promise<string> {
    // If no token or token is expired, refresh it
    if (!bearerToken || isTokenExpired()) {
      const result = await fetchTokenFromKeycloak();
      bearerToken = result.access_token;
      tokenExpiresAt = result.tokenExpiresAt;
    }
    return bearerToken;
  }
}
