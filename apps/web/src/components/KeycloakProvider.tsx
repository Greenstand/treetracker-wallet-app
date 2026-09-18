"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSetAtom } from "jotai";
import { tokenAtom } from "core";
import {
  clearStoredTokens,
  getKeycloak,
  initKeycloak,
  saveStoredTokens,
} from "@/auth/keycloak";
import LoadingSpinner from "@/components/LoadingSpinner";

type AuthState = { ready: boolean; authenticated: boolean };
const KeycloakContext = createContext<AuthState>({
  ready: false,
  authenticated: false,
});

export const useAuth = () => useContext(KeycloakContext);

// init now makes a network call (keycloak-js forces updateToken when it is
// handed stored tokens), and the whole app is blocked behind it. If Keycloak is
// slow or unreachable that would be an indefinite spinner, so cap the wait and
// fall through to the login route, which is recoverable.
const INIT_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Keycloak init timed out")),
      ms,
    );
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

export function KeycloakProvider({ children }: { children: ReactNode }) {
  const setToken = useSetAtom(tokenAtom);
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;
    const kc = getKeycloak();

    // The only two things that end a session: Keycloak refusing to refresh, and
    // an explicit logout. Never an HTTP status from a resource call, which may
    // mean "not allowed", not "expired". See the revert in #819.
    const endSession = () => {
      setToken(null);
      clearStoredTokens();
    };

    // No-op while the access token is good for another 30s; otherwise renews it
    // from the refresh token. Only Keycloak refusing that ends the session.
    const refresh = () => {
      if (!kc?.authenticated) return;
      kc.updateToken(30)
        .then((refreshed) => {
          if (refreshed && kc.token) {
            setToken(kc.token);
            saveStoredTokens();
          }
        })
        .catch(endSession);
    };

    // Must be set before init(): keycloak-js arms the expiry timer inside
    // setToken() only for a handler that already exists (dist/keycloak.js:1666),
    // and never arms one later. Each refresh re-arms it the same way.
    if (kc) kc.onTokenExpired = refresh;

    // Background tabs throttle timers and sleep stops them, so also renew when
    // the user comes back rather than trusting the timer alone.
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    withTimeout(initKeycloak(), INIT_TIMEOUT_MS)
      .then((auth) => {
        if (!active) return;
        setAuthenticated(Boolean(auth));
        if (auth && kc?.token) {
          // Mirror the Keycloak token into tokenAtom so existing consumers
          // (protected layout, wallet API hooks) keep working unchanged, and
          // persist the pair so the next page load can resume this session.
          setToken(kc.token ?? null);
          saveStoredTokens();
        } else {
          // Keycloak reports no session. Anything still in storage is dead, so
          // drop it rather than let the data hooks send it and collect 401s.
          endSession();
        }
        setReady(true);
      })
      .catch(() => {
        // init rejects when the stored refresh token is no longer accepted, and
        // the wrapper rejects if it takes too long to find out.
        if (!active) return;
        endSession();
        setReady(true);
      });
    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [setToken]);

  // Block rendering (so route layouts don't run their token redirects) until the
  // Keycloak session check / callback processing has completed.
  if (!ready) return <LoadingSpinner />;

  return (
    <KeycloakContext.Provider value={{ ready, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
}
