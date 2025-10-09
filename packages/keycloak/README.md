The typescript project to deal with Keycloak

Please put all those functions that communicate with keycloak here, like: create
a new user function

## Keycloak — Delete User (README)

1. Setup

Create your .env in packages/keycloak/ using .env.example as the template.

Ask for the client secret and database URL in the admin chat.

From the repo root, install deps: yarn install

Do not commit .env. Keep .env.example updated with placeholders.

2. How to Test (End-to-End)

Create a test user in Keycloak (in the correct realm).

Open: packages/keycloak/tests/deleteAccount.spec.e2e.ts

Replace the placeholder with the email of the user you want to delete.

Run the e2e test from the keycloak folder:

# NODE_TLS_REJECT_UNAUTHORIZED=0 yarn test:e2e

(If your script name differs, use the one defined in
packages/keycloak/package.json.)

3. Notes / Safety

This test deletes a real Keycloak user. Use a test account and the intended
realm.

If you run into auth issues, re-check the .env values and that the client has
the needed admin permissions.
