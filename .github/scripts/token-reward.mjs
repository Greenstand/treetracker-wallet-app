
const MAX_AMOUNT = Number(process.env.MAX_REWARD || 1000);

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

function env(name) {
  const value = process.env[name];
  if (!value) throw new Error(`env var ${name} is not set`);
  return value;
}

async function keycloakToken() {
  const body = new URLSearchParams({
    client_id: env("KEYCLOAK_CLIENT_ID"),
    client_secret: env("KEYCLOAK_CLIENT_SECRET"),
    grant_type: "client_credentials",
  });

  const res = await fetch(
    `${env("KEYCLOAK_URL")}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  if (!res.ok) throw new Error(`keycloak ${res.status}: ${await res.text()}`);

  return (await res.json()).access_token;
}

async function transfer(token, to, amount) {
  const res = await fetch(`${env("WALLET_API_URL")}/transfers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bundle: { bundle_size: amount },
      sender_wallet: env("TREASURY_WALLET"),
      receiver_wallet: to,
      claim: false,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    // 404 here means the volunteer gave a name no wallet has.
    throw new Error(`transfer failed (${res.status}): ${body}`);
  }

  return res.json();
}

const to = arg("to");
const amount = Number(arg("amount"));
const dryRun = process.argv.includes("--dry-run");

if (!to || !Number.isInteger(amount) || amount < 1) {
  throw new Error("usage: --to <wallet> --amount <positive integer>");
}
// A mislabelled issue should not be able to drain the treasury.
if (amount > MAX_AMOUNT) {
  throw new Error(`amount ${amount} is above the cap of ${MAX_AMOUNT}`);
}

if (dryRun) {
  console.log(`dry run: would send ${amount} tokens to ${to}`);
  process.exit(0);
}

const token = await keycloakToken();
const result = await transfer(token, to, amount);
console.log(`sent ${amount} tokens to ${to}, transfer ${result.id} (${result.state})`);
