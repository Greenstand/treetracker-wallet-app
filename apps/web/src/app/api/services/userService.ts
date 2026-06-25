import { getToken } from "./tokenService";

const keycloakBaseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL;

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    // Get the access token
    const tokenData = await getToken();

    // API for creating the user
    const createUserApi = `${keycloakBaseUrl}/admin/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/users`;

    const response = await fetch(createUserApi, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        enabled: true,
        credentials: [
          {
            type: "password",
            value: userData.password,
            temporary: false,
          },
        ],
      }),
    });

    // Check if response is valid
    if (response.status === 201) {
      return { success: true, message: "User created successfully!" };
    } else if (response.status === 409) {
      return { success: false, message: "User already exists!" };
    } else {
      // Check content-type before trying to parse
      const contentType = response.headers.get("content-type") || "";
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        if (contentType.includes("application/json")) {
          // API returned JSON error
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } else {
          // API returned HTML or other format (don't try to JSON.parse it!)
          const text = await response.text();
          errorMessage = text.substring(0, 100); // Show first 100 chars
        }
      } catch {
        errorMessage = `HTTP ${response.status}`;
      }
      
      throw new Error(`Failed to create user: ${errorMessage}`);
    }
  } catch (error: unknown) {
    console.error("Error during user creation:", error);
    throw error; // Re-throw the error to handle it in the route
  }
};
