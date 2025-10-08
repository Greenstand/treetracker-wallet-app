import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { HttpStatusCode } from "axios";

export interface CreateAccountDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateAccountResponse {
  success: boolean;
  message: string;
}

export async function createAccount(
  userData: CreateAccountDto,
  httpService: HttpService,
  getToken: () => Promise<string>,
): Promise<CreateAccountResponse> {
  const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
  const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;

  if (!keycloakBaseUrl || !keycloakRealm) {
    throw new Error("Keycloak configuration is missing");
  }

  try {
    // Get the access token
    const tokenData = await getToken();

    // API for creating the user
    const createUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users`;

    const headers = {
      Authorization: `Bearer ${tokenData}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      enabled: true,
      emailVerified: false,
      credentials: [
        {
          type: "password",
          value: userData.password,
          temporary: false,
        },
      ],
    });

    const response = await firstValueFrom(
      httpService.post(createUserApiUrl, body, { headers }),
    );

    // Check if response is valid
    if (response?.status === 201) {
      return { success: true, message: "User created successfully!" };
    }

    throw new Error(`Unexpected response status: ${response?.status}`);
  } catch (error: any) {
    const errorMessage = error.response?.data?.errorMessage || error.message;

    if (error.response?.status === 409) {
      // user already exists
      throw new Error(errorMessage);
    } else if (error.response?.status === HttpStatusCode.Forbidden) {
      throw new Error("Forbidden: Insufficient permissions");
    } else {
      throw new Error(`Error creating user: ${errorMessage}`);
    }
  }
}
