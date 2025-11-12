import axios, { HttpStatusCode } from "axios";

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
  // Changed: Removed HttpService dependency. Axios is used directly.
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

    const body = {
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
    };

    // Changed: Using axios.post directly. No need for firstValueFrom.
    const response = await axios.post(createUserApiUrl, body, { headers });

    // Check if response is valid (Keycloak returns 201 on success)
    if (response?.status === 201) {
      return { success: true, message: "User created successfully!" };
    }

    throw new Error(`Unexpected response status: ${response?.status}`);
  } catch (error: any) {
    // Check if the error is an Axios error with a response status
    const status = error.response?.status;
    const errorMessage = error.response?.data?.errorMessage || error.message;

    if (status === 409) {
      // user already exists
      throw new Error(errorMessage);
    } else if (status === HttpStatusCode.Forbidden) {
      throw new Error("Forbidden: Insufficient permissions");
    } else {
      throw new Error(`Error creating user: ${errorMessage}`);
    }
  }
}
