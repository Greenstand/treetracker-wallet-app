// Test-data seeding for the send-token BDD: delete-then-create the fixed test
// accounts + wallets so each run starts clean and deterministic.
//
// - Keycloak user create/delete  → @treetracker/keycloak (as requested)
// - Wallet create                → @treetracker/wallet (fires the first-wallet gift)
// - Wallet wipe                  → direct DB delete (wallet-api has no delete endpoint;
//                                  user-authorized). Lives here, NOT in @treetracker/wallet,
//                                  because that package is bundled by the web frontend and
//                                  cannot import `pg`.
import "dotenv/config";
import { Client } from "pg";
// Import package functions by subpath. The package index files use `export *`
// re-exports (and @treetracker/wallet's index also pulls in React hooks → core/
// jotai) which don't resolve cleanly in this plain-node (tsx/ts-node) context.
// These individual api files only use axios + config.
import { fetchTokenFromKeycloak } from "@treetracker/keycloak/src/api/fetchTokenFromKeycloak.ts";
import { deleteAccountFromKeycloak } from "@treetracker/keycloak/src/api/deleteAccountFromKeycloak.ts";
import { createUser } from "@treetracker/keycloak/src/api/createAccountFromKeycloak.ts";
import { createWallet } from "@treetracker/wallet/src/api/createWallet.ts";
import { getTokens } from "@treetracker/wallet/src/api/getTokens.ts";

const KC_BASE = process.env.PRIVATE_KEYCLOAK_BASE_URL ?? "";
const KC_REALM = process.env.PRIVATE_KEYCLOAK_REALM ?? "";
const KC_PUBLIC_CLIENT = process.env.KEYCLOAK_PUBLIC_CLIENT_ID ?? "wallet-app-web";
const DB_URL = process.env.WALLET_DATABASE_URL ?? "";
const DB_SCHEMA = process.env.WALLET_DATABASE_SCHEMA ?? "wallet";
const SENDER_WALLET_ID = process.env.SENDER_WALLET_ID ?? "";

export type SeededAccount = {
  email: string; // also used as the Keycloak username
  password: string;
  walletName: string;
};

// Mint an end-user access token via the Keycloak direct password grant.
async function userToken(username: string, password: string): Promise<string> {
  const url = `${KC_BASE}/realms/${KC_REALM}/protocol/openid-connect/token`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "password",
      client_id: KC_PUBLIC_CLIENT,
      username,
      password,
    }),
  });
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error(`password grant failed for ${username}: HTTP ${res.status}`);
  }
  return data.access_token;
}

// Find a Keycloak user id by username (admin API). Returns null if absent.
async function findUserId(
  adminToken: string,
  username: string,
): Promise<string | null> {
  const url = `${KC_BASE}/admin/realms/${KC_REALM}/users?username=${encodeURIComponent(
    username,
  )}&exact=true`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const list = (await res.json()) as Array<{ id: string }>;
  return Array.isArray(list) && list.length > 0 ? list[0].id : null;
}

// Destructively wipe a wallet (by its globally-unique name) and everything that
// references it. Tokens are RE-HOMED to SENDER_WALLET_ID (not deleted) so the
// gift pool (test-wallet-08) doesn't drain across runs. FK-safe order.
async function deleteWalletByName(name: string): Promise<void> {
  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(`SET search_path TO ${DB_SCHEMA}`);
    const { rows } = await client.query(
      "SELECT id FROM wallet WHERE name = $1",
      [name],
    );
    if (rows.length === 0) return; // nothing to wipe
    const walletId = rows[0].id;

    await client.query(
      `DELETE FROM wallet_trust_log
       WHERE actor_wallet_id = $1 OR target_wallet_id = $1 OR originator_wallet_id = $1
          OR wallet_trust_id IN (
            SELECT id FROM wallet_trust
            WHERE actor_wallet_id = $1 OR target_wallet_id = $1 OR originator_wallet_id = $1
          )`,
      [walletId],
    );
    await client.query(
      `DELETE FROM wallet_trust
       WHERE actor_wallet_id = $1 OR target_wallet_id = $1 OR originator_wallet_id = $1`,
      [walletId],
    );
    await client.query(
      `DELETE FROM transaction
       WHERE source_wallet_id = $1 OR destination_wallet_id = $1
          OR token_id IN (SELECT id FROM token WHERE wallet_id = $1)`,
      [walletId],
    );
    await client.query(
      `DELETE FROM transfer
       WHERE originator_wallet_id = $1 OR source_wallet_id = $1 OR destination_wallet_id = $1`,
      [walletId],
    );
    await client.query("DELETE FROM wallet_event WHERE wallet_id = $1", [
      walletId,
    ]);
    // Re-home this wallet's tokens to the gift sender instead of deleting them,
    // keeping the gift pool funded for future runs.
    if (SENDER_WALLET_ID) {
      await client.query(
        `UPDATE token
         SET wallet_id = $2, transfer_pending = false, transfer_pending_id = null, updated_at = now()
         WHERE wallet_id = $1`,
        [walletId, SENDER_WALLET_ID],
      );
    } else {
      await client.query("DELETE FROM token WHERE wallet_id = $1", [walletId]);
    }
    await client.query("DELETE FROM wallet WHERE id = $1", [walletId]);
  } finally {
    await client.end();
  }
}

// Delete (if present) then recreate the Keycloak user + wallet. When
// requireToken is true (the sender), poll until the wallet holds ≥1 token
// (the first-wallet gift).
export async function seedAccount(
  acct: SeededAccount,
  requireToken: boolean,
): Promise<void> {
  const { email, password, walletName } = acct;
  const { access_token: adminToken } = await fetchTokenFromKeycloak();

  // 1. delete existing KC user (username == email)
  const existingId = await findUserId(adminToken, email);
  if (existingId) {
    await deleteAccountFromKeycloak(adminToken, existingId);
  }
  // 2. wipe the wallet row (frees the global name)
  await deleteWalletByName(walletName);

  // 3. recreate the KC user
  await createUser(
    {
      username: email,
      email,
      password,
      firstName: "Send",
      lastName: "Token",
    },
    adminToken,
  );

  // 4. create the wallet as that user (first wallet → server gift)
  const token = await userToken(email, password);
  await createWallet({ name: walletName }, token);

  // 5. sender must actually hold a token before the scenario sends it
  if (requireToken) {
    const deadline = Date.now() + 30_000;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await getTokens(token, walletName, 10);
      if ((res.tokens?.length ?? 0) >= 1) break;
      if (Date.now() > deadline) {
        throw new Error(`wallet ${walletName} never received its gift token`);
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
}

// Mint a token for an already-seeded account (used by steps that query the API).
export async function tokenFor(acct: SeededAccount): Promise<string> {
  return userToken(acct.email, acct.password);
}
