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

### unit tests

`yarn test:unit`
