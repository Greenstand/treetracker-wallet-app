import test from "node:test";
import assert from "node:assert";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(new URL("./token-reward.mjs", import.meta.url));

// Stands in for Keycloak and the wallet API. `transfer` decides what
// POST /transfers answers.
async function stub(transfer) {
  const server = createServer((req, res) => {
    if (req.url.endsWith("/protocol/openid-connect/token")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ access_token: "token" }));
    }
    const { status, body } = transfer();
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(body);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  return { url, close: () => new Promise((r) => server.close(r)) };
}

function run(env) {
  const child = spawn(
    process.execPath,
    [SCRIPT, "--to", "hariet", "--amount", "5"],
    {
      env: { PATH: process.env.PATH, ...env },
    },
  );
  return new Promise((resolve) => child.on("close", resolve));
}

const creds = (url) => ({
  KEYCLOAK_URL: url,
  KEYCLOAK_CLIENT_ID: "reward-bot",
  KEYCLOAK_CLIENT_SECRET: "secret",
  WALLET_API_URL: url,
  TREASURY_WALLET: "greenstand-reward-treasury",
});

test("exits 2 when the environment is incomplete, so nothing was sent", async () => {
  assert.equal(await run({}), 2);
});

test("exits 2 when the amount is over the cap, so nothing was sent", async () => {
  const s = await stub(() => ({ status: 200, body: "{}" }));
  assert.equal(await run({ ...creds(s.url), MAX_REWARD: "1" }), 2);
  await s.close();
});

test("exits 2 on a 404, the wallet name is wrong and nothing moved", async () => {
  const s = await stub(() => ({
    status: 404,
    body: JSON.stringify({ message: "no wallet" }),
  }));
  assert.equal(await run(creds(s.url)), 2);
  await s.close();
});

test("exits 1 on a 500, the transfer may have landed", async () => {
  const s = await stub(() => ({ status: 500, body: "boom" }));
  assert.equal(await run(creds(s.url)), 1);
  await s.close();
});

test("exits 1 when a 2xx body cannot be read", async () => {
  const s = await stub(() => ({ status: 200, body: "not json" }));
  assert.equal(await run(creds(s.url)), 1);
  await s.close();
});

test("exits 0 when the transfer lands", async () => {
  const s = await stub(() => ({
    status: 200,
    body: JSON.stringify({ id: "t1", state: "pending" }),
  }));
  assert.equal(await run(creds(s.url)), 0);
  await s.close();
});
