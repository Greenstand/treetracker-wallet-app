import { KEYCLOAK_BASE_URL, KEYCLOAK_REALM } from "../utils/config";
import axios, { AxiosResponse, isAxiosError } from "axios";

export async function deleteAccountFromKeycloak(
  token: string,
  userId: string,
): Promise<AxiosResponse> {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const url = `${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}`;
    const response = await axios.delete(url, { headers });
    return response;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message ||
        "Failed to delete account from Keycloak";
      throw new Error(errorMessage);
    }
    throw error;
  }
}
