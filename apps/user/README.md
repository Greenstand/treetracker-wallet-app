# User API

User management API for Treetracker Wallet App

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | register a new user |

## Installing dependencies

`yarn`

## Starting server

`yarn start`

## Endpoints

```
curl --location 'http://localhost:8080/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "",
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": ""
}'
```

## Swagger

`yarn start` then go to:

http://localhost:8080/swagger

## Testing

### e2e tests

`test:e2e`

### integration tests

`yarn int-test`

### unit tests

`yarn test:unit`

## How to access wallet api (Draft)

### Set up Keycloak 

Attach permission by adding new role to this user api client, so the wallet api can auth with this user api client by verifying the role, say: `wallet-operator-microservice`

1. Create a new realm role
  1.1. Go to `Realm Roles` -> `Create Role`
  1.2. Name it `wallet-operator-microservice`
  1.3. Save

2. Attach the role to the user api client
  2.1. Go to `Clients` -> `wallet-app-user-dev-svc` -> `Client scopes`
  2.2. Find the item: `xxx-dedicated`, here in this case, it is `wallet-app-user-dev-svc-dedicated`
  2.3. Click `Add mapper` -> `by configuration` -> `Hardcoded role`
  2.4. Input `operator`, choose the role created in step 1, `wallet-operator-microservice`
  2.5. Save


### Get access token

```
curl -X POST "https://dev-k8s.treetracker.org/keycloak/realms/treetracker/protocol/openid-connect/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials" \
-d "client_id=wallet-app-user-dev-svc" \
-d "client_secret=xxx"
```

will get a response like:

```
{
  "exp": 1735014913,
  "iat": 1735011313,
  "jti": "af7a3829-438c-4378-9fca-4444312c4713",
  "iss": "https://dev-k8s.treetracker.org/keycloak/realms/treetracker",
  "aud": [
    "realm-management",
    "account"
  ],
  "sub": "48bad75f-8771-47f2-9a79-048b58f21da8",
  "typ": "Bearer",
  "azp": "wallet-app-user-dev-svc",
  "acr": "1",
  "allowed-origins": [
    "/*"
  ],
  "realm_access": {
    "roles": [
      "wallet-operator-microservice",
      "default-roles-treetracker",
      "offline_access",
      "uma_authorization"
    ]
  },
  "resource_access": {
    "realm-management": {
      "roles": [
        "manage-users"
      ]
    },
    "wallet-app-user-dev-svc": {
      "roles": [
        "uma_protection"
      ]
    },
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  },
  "scope": "email profile",
  "email_verified": false,
  "clientHost": "10.138.214.225",
  "preferred_username": "service-account-wallet-app-user-dev-svc",
  "clientAddress": "10.138.214.225",
  "client_id": "wallet-app-user-dev-svc"
}
```

In the realm role, `wallet-operator-microservice` is attached to the user api client, `wallet-app-user-dev-svc`, so the access token can be used to access the wallet api.

### Access wallet api

The wallet api will verify the access token by checking the role `wallet-operator-microservice` in the access token.

