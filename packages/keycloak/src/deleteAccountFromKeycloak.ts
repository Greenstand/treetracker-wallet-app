// packages/keycloak/src/deleteAccountFromKeycloak.ts
import { HttpService } from "@nestjs/axios";
import { HttpException } from "@nestjs/common";
import * as dotenv from "dotenv";
import { firstValueFrom } from "rxjs";
dotenv.config();

type KeycloakUser = { id: string; email?: string };

export async function deleteAccountFromKeycloak(
  http: HttpService,
  getToken: () => Promise<string>,
  email: string,
): Promise<boolean> {
  const base = process.env.PRIVATE_KEYCLOAK_BASE_URL!;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM!;
  const accessToken = await getToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const usersUrl = `${base}/admin/realms/${realm}/users?email=${encodeURIComponent(email)}&exact=true`;
  const { data: users } = await firstValueFrom(
    http.get<KeycloakUser[]>(usersUrl, { headers }),
  );
  const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
  if (!user?.id) throw new HttpException("User not found", 404);

  const delUrl = `${base}/admin/realms/${realm}/users/${user.id}`;
  const resp = await firstValueFrom(http.delete<void>(delUrl, { headers }));
  if (resp.status === 204) return true;
  throw new HttpException(`Unexpected response: ${resp.status}`, 502);
}
