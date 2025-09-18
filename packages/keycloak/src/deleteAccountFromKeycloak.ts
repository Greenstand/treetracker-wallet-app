

// pass getToken as a parameter, so in the client side like user api, can use useGetToken to create the function and use closure to keep the token fetched, for a http call session, it is good enought to use this way to avoid refetch token again and again
export async deleteAccountFromKeycloak(email: string, getToken: ()=> Promise<string>){
    const keycloakBaseUrl = process.env.PRIVATE_KEYCLOAK_BASE_URL;
    const keycloakRealm = process.env.PRIVATE_KEYCLOAK_REALM;

    try {
      // Step 1: Get access token
      const tokenData = await getToken();
      const headers = {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      };

      // Step 2: Lookup user by username (email)
      const getUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users?email=${userData.email}`;
      const users = await firstValueFrom(
        this.httpService.get(getUserApiUrl, { headers }),
      );

      const userId = users.data[0]?.id;
      if (!userId) {
        return { success: false, message: "User not found" };
      }

      // Step 3: DELETE the user
      const deleteUserApiUrl = `${keycloakBaseUrl}/admin/realms/${keycloakRealm}/users/${userId}`;
      const response = await firstValueFrom(
        this.httpService.delete(deleteUserApiUrl, { headers }),
      );

      if (response?.status === 204) {
        return true;
      } else {
        throw new HttpException(`Unexpected response: ${response.status}`, 500),
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.message;

      if (error.response?.status === 404) {
        return new HttpException("User not found", 404);
      } else if (error.response?.status === 403) {
        throw new HttpException("Unauthorized to delete user", 403);
      } else {
        throw new HttpException(errorMessage || "Error deleting user", 500);
      }
    }
  }
