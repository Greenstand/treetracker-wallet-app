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

// Idempotent init (guards React strict-mode double invocation). Also processes the
// OIDC authorization-code response when running on the /auth/callback URL.
export function initKeycloak(): Promise<boolean> {
  const kc = getKeycloak();
  if (!kc) return Promise.resolve(false);
  if (!initPromise) {
    // No `onLoad` — init must NOT trigger its own redirect (that would race the
    // explicit login()/register() redirects from the login/signup pages). init
    // still processes the OIDC code on /auth/callback regardless of onLoad.
    initPromise = kc.init({ pkceMethod: "S256", checkLoginIframe: false });
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
  const kc = getKeycloak();
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}${basePath}/login`
      : undefined;

  // End the Keycloak session only with a live id_token; otherwise kc.logout()
  // sends id_token_hint=undefined and Keycloak errors. Fall back to a local clear.
  if (kc?.authenticated && kc.idToken) {
    kc.logout({ redirectUri });
    return;
  }

  try {
    sessionStorage.removeItem("token");
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.location.assign("/login");
  }
}

export function accountUrl(): string | undefined {
  return getKeycloak()?.createAccountUrl({
    redirectUri:
      typeof window !== "undefined" ? window.location.href : undefined,
  });
}
