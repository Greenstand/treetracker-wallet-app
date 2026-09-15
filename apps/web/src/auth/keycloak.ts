import Keycloak from "keycloak-js";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Single keycloak-js instance for the app (browser-only). Mirrors the pattern used
// by treetracker-admin-client: a public client + PKCE, hosted login/registration.
let keycloak: Keycloak | null = null;
let initPromise: Promise<boolean> | null = null;

export function getKeycloak(): Keycloak | null {
  if (typeof window === "undefined") return null;
  if (!keycloak) {
    keycloak = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
    });
  }
  return keycloak;
}

// sessionStorage key holding the tokens needed to resume a session across a
// page load. Separate from the `token` key that tokenAtom owns, so the two
// serialisations never have to agree.
const STORED_TOKENS_KEY = "kc_tokens";

type StoredTokens = { token?: string; refreshToken?: string };

function readStoredTokens(): StoredTokens {
  try {
    const raw = sessionStorage.getItem(STORED_TOKENS_KEY);
    return raw ? (JSON.parse(raw) as StoredTokens) : {};
  } catch {
    return {};
  }
}

// Call after every successful init or refresh: Keycloak may rotate the refresh
// token, so the stored pair has to be replaced, not just written once.
export function saveStoredTokens(): void {
  const kc = getKeycloak();
  if (!kc?.token || !kc.refreshToken) return;
  try {
    sessionStorage.setItem(
      STORED_TOKENS_KEY,
      JSON.stringify({ token: kc.token, refreshToken: kc.refreshToken }),
    );
  } catch {
    /* ignore */
  }
}

export function clearStoredTokens(): void {
  try {
    sessionStorage.removeItem(STORED_TOKENS_KEY);
  } catch {
    /* ignore */
  }
}

// Idempotent init (guards React strict-mode double invocation). Also processes the
// OIDC authorization-code response when running on the /auth/callback URL.
export function initKeycloak(): Promise<boolean> {
  const kc = getKeycloak();
  if (!kc) return Promise.resolve(false);
  if (!initPromise) {
    // No `onLoad` — init must NOT trigger its own redirect (that would race the
    // explicit login()/register() redirects from the login/signup pages). init
    // still processes the OIDC code on /auth/callback regardless of onLoad.
    // `check-sso` is not an option either: this client only whitelists
    // /auth/callback as a redirect URI, so both the silent iframe and the
    // redirect form are rejected by Keycloak.
    //
    // Instead, hand back the tokens stored by the previous page load. A parsed
    // /auth/callback takes priority over these inside keycloak-js, so the login
    // flow is unaffected. When they are used, keycloak-js immediately calls
    // updateToken(-1): a live session refreshes and init resolves, a dead one
    // rejects and KeycloakProvider clears the session.
    initPromise = kc.init({
      pkceMethod: "S256",
      checkLoginIframe: false,
      ...readStoredTokens(),
    });
  }
  return initPromise;
}

const callbackUri = () =>
  typeof window !== "undefined"
    ? `${window.location.origin}${basePath}/auth/callback`
    : undefined;

export function login(): void {
  getKeycloak()?.login({ redirectUri: callbackUri() });
}

export function register(): void {
  getKeycloak()?.register({ redirectUri: callbackUri() });
}

export function logout(): void {
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}${basePath}/login`
      : undefined;
  getKeycloak()?.logout({ redirectUri });
}

export function accountUrl(): string | undefined {
  return getKeycloak()?.createAccountUrl({
    redirectUri:
      typeof window !== "undefined" ? window.location.href : undefined,
  });
}
