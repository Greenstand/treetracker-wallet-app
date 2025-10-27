import axios, { AxiosError } from "axios";
import * as dotenv from "dotenv";
import { getTokenManager } from "./getToken";

dotenv.config();

type KeycloakUser = {
  id: string;
  username: string;
  email?: string;
};

type DeleteAccountResult = {
  success: true;
  message: string;
};

export async function deleteAccountFromKeycloak(
  email: string,
): Promise<DeleteAccountResult> {
  const baseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL!;
  const realm = process.env.PRIVATE_KEYCLOAK_REALM!;

  try {
    const { getToken } = getTokenManager();
    const accessToken = await getToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const { data: users } = await axios.get<KeycloakUser[]>(
      `${baseUrl}/admin/realms/${realm}/users`,
      {
        headers,
        params: { email },
      },
    );

    if (!users.length) {
      throw new Error("User not found");
    }

    const userId = users[0].id;
    await axios.delete(`${baseUrl}/admin/realms/${realm}/users/${userId}`, {
      headers,
    });

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    if (isAxiosErrorWithResponse(error)) {
      const message =
        (error.response?.data as { errorMessage?: string })?.errorMessage ??
        error.response?.statusText ??
        "Failed to delete user";
      throw new Error(message);
    }

    throw error instanceof Error ? error : new Error("Failed to delete user");
  }
}

function isAxiosErrorWithResponse(
  error: unknown,
): error is AxiosError<{ errorMessage?: string }> {
  return axios.isAxiosError(error);
}
