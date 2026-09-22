// Loads the signed-in user's profile for the Account screen.
//
// Two independent sources, tried in order:
//   1. the user service (NEXT_PUBLIC_TREETRACKER_USER_API + "/me") -> email and
//      the account creation date. createdTimestamp is not an OIDC claim, so the
//      user service is the only source for "Member Since".
//   2. Keycloak's OIDC userinfo endpoint -> email only.
//
// The user service is not reachable in every environment: on dev its Ambassador
// mapping answers 503 and it is not deployed to production at all. When it is
// down the screen must still show what Keycloak can tell us, instead of
// replacing the whole card with an error.

export type UserProfile = {
  email: string | null;
  /** ISO date string, or null when no source could provide it. */
  createdAt: string | null;
  /** True when the token itself was rejected, so the caller can ask for a new login. */
  sessionExpired: boolean;
};

type ProfileFields = { email: string | null; createdAt: string | null };

type SourceResult = {
  /** Null when the source was skipped, unreachable or returned an error. */
  fields: ProfileFields | null;
  /** True when the source was actually called (configured and answered). */
  answered: boolean;
  /** True when the source rejected the bearer token with 401. */
  unauthorized: boolean;
};

const SKIPPED: SourceResult = {
  fields: null,
  answered: false,
  unauthorized: false,
};

// An unset NEXT_PUBLIC_* var is inlined by `next build` as the value `undefined`,
// which becomes the literal string "undefined" once interpolated into a URL.
// Treat both as unset so we never request "undefined/me".
const baseUrl = (value?: string): string =>
  !value || value === "undefined" ? "" : value.replace(/\/+$/, "");

const USER_API = baseUrl(process.env.NEXT_PUBLIC_TREETRACKER_USER_API);
const KEYCLOAK_URL = baseUrl(process.env.NEXT_PUBLIC_KEYCLOAK_URL);
const KEYCLOAK_REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? "";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const asString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

async function fromUserApi(token: string): Promise<SourceResult> {
  if (!USER_API) return SKIPPED;

  try {
    const response = await fetch(`${USER_API}/me`, {
      method: "GET",
      headers: authHeaders(token),
    });

    if (response.status === 401) {
      return { fields: null, answered: true, unauthorized: true };
    }
    if (!response.ok) {
      return { fields: null, answered: true, unauthorized: false };
    }

    const data = await response.json();
    return {
      fields: {
        email: asString(data?.email),
        createdAt: asString(data?.createdAt),
      },
      answered: true,
      unauthorized: false,
    };
  } catch {
    // Network failure, CORS rejection or a body that is not JSON.
    return { fields: null, answered: false, unauthorized: false };
  }
}

async function fromKeycloak(token: string): Promise<SourceResult> {
  if (!KEYCLOAK_URL || !KEYCLOAK_REALM) return SKIPPED;

  try {
    const response = await fetch(
      `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
      { method: "GET", headers: authHeaders(token) },
    );

    if (response.status === 401) {
      return { fields: null, answered: true, unauthorized: true };
    }
    if (!response.ok) {
      return { fields: null, answered: true, unauthorized: false };
    }

    const data = await response.json();
    const username = asString(data?.preferred_username);
    return {
      fields: {
        email:
          asString(data?.email) ?? (username?.includes("@") ? username : null),
        // userinfo carries no account creation date.
        createdAt: null,
      },
      answered: true,
      unauthorized: false,
    };
  } catch {
    return { fields: null, answered: false, unauthorized: false };
  }
}

export async function loadUserProfile(token: string): Promise<UserProfile> {
  const service = await fromUserApi(token);
  const email = service.fields?.email ?? null;
  const createdAt = service.fields?.createdAt ?? null;

  if (email) {
    return { email, createdAt, sessionExpired: false };
  }

  const idp = await fromKeycloak(token);

  // Keycloak issued the token, so its verdict wins. Only fall back to the user
  // service's 401 when Keycloak could not be asked at all.
  const sessionExpired = idp.answered ? idp.unauthorized : service.unauthorized;

  return {
    email: idp.fields?.email ?? null,
    createdAt,
    sessionExpired,
  };
}

/** "September 22, 2026", or null when the input is missing or unparsable. */
export function formatMemberSince(isoDate: string | null): string | null {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
