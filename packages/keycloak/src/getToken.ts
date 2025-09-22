import { fetchTokenFromKeycloak } from "./fetchTokenFromKeycloak";

export function useGetToken() {
  let bearerToken: string | null = null;
  let tokenExpiresAt: number | null = null;

  function isTokenExpired(): boolean {
    return !tokenExpiresAt || Date.now() >= tokenExpiresAt;
  }

  async function getToken(): Promise<string> {
    if (!bearerToken || isTokenExpired()) {
      const result = await fetchTokenFromKeycloak();
      bearerToken = result.access_token;
      tokenExpiresAt = result.tokenExpiresAt;
    }
    return bearerToken!;
  }

  return { getToken };
}
