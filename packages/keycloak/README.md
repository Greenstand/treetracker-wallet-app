# @treetracker/keycloak

A TypeScript package for interacting with Keycloak identity and access management. This package provides functions to communicate with Keycloak, including user management operations.

## Features

- **Admin Token Fetching**: Obtain admin access tokens using client credentials
- **Account Deletion**: Delete user accounts from Keycloak via the Admin REST API

## Installation

`yarn install @treetracker/keycloak`

## Configuration

This package supports both Node.js and React Native environments. Configuration is handled automatically based on the runtime environment.

### Node.js Environment

Create a `.env` file in your project root with the following variables:

```shell
PRIVATE_KEYCLOAK_BASE_URL = https:/your-keycloak-instance.com
PRIVATE_KEYCLOAK_REALM = your-realm-name
PRIVATE_KEYCLOAK_CLIENT_ID = your-client-id
PRIVATE_KEYCLOAK_CLIENT_SECRET = your-client-secret
```
### React Native Environment

Configuration is handled through Expo constants in your `app.json` or `app.config.js`:

```json
{
  "extra": {
    "keycloakBaseUrl": "https://your-keycloak-instance.com",
    "keycloakRealm": "your-realm-name",
    "keycloakClientId": "your-client-id",
    "keycloakClientSecret": "your-client-secret"
  }
}
```

## Usage

### Fetching Admin Token

Obtain an admin access token using client credentials:

```ts
import { fetchTokenFromKeycloak } from '@treetracker/keycloak';

const { access_token, tokenExpiresAt } = await fetchTokenFromKeycloak();
// Use access_token for admin operations
// tokenExpiresAt is the timestamp when the token expires
```
### Deleting an Account

Delete a user account from Keycloak:
```ts
import { deleteAccountFromKeycloak, fetchTokenFromKeycloak } from '@treetracker/keycloak';

// First, get an admin token
const { access_token } = await fetchTokenFromKeycloak();

// Delete the user account
try {
  const response = await deleteAccountFromKeycloak(access_token, userId);
  // Response status will be 204 on success
  console.log('Account deleted successfully');
} catch (error) {
  console.error('Failed to delete account:', error.message);
}
```

**Parameters:**
- `token` (string): Admin access token (obtained via `fetchTokenFromKeycloak`)
- `userId` (string): The Keycloak user ID to delete

**Returns:**
- `Promise<AxiosResponse>`: Axios response object with status 204 on successful deletion

**Throws:**
- `Error`: If the deletion fails, with a descriptive error message

## API Reference

### `fetchTokenFromKeycloak()`

Fetches an admin access token from Keycloak using client credentials grant.

**Returns:** `Promise<{ access_token: string, tokenExpiresAt: number }>`

### `deleteAccountFromKeycloak(token: string, userId: string)`

Deletes a user account from Keycloak.

**Parameters:**
- `token` (string): Bearer token for authentication
- `userId` (string): Keycloak user ID

**Returns:** `Promise<AxiosResponse>`

## Testing

The package includes end-to-end tests. To run tests:

`yarn test` require the environment variables mentioned in the Configuration section to be set.
