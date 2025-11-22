import axios, { isAxiosError } from "axios";
import { KEYCLOAK_BASE_URL, KEYCLOAK_REALM } from "../utils/config";

type User = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function createUser(user: User, token: string) {
  try {
    const createUserUrl = `${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users`;
    const body = JSON.stringify({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: true,
      emailVerified: false,
      credentials: [
        {
          type: "password",
          value: user.password,
          temporary: false,
        },
      ],
    });
    const response = await axios.post(createUserUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // Get the user id from the location header
    const userId = response.headers.location.split("/users/")[1];
    return userId;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        const searchUrl = `${KEYCLOAK_BASE_URL}/admin/realms/${KEYCLOAK_REALM}/users?username=${user.username}`;
        const searchResponse = await axios.get(searchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (searchResponse.data && searchResponse.data.length > 0) {
          const userId = searchResponse.data[0].id;
          return userId;
        }
        throw new Error("User not found");
      }
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
}
