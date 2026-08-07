"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { useSetAtom } from "jotai";
import { tokenAtom } from "core";
import { getKeycloak, initKeycloak } from "@/auth/keycloak";
import LoadingSpinner from "@/components/LoadingSpinner";

const WALLET_API = process.env.NEXT_PUBLIC_TREETRACKER_WALLET_API ?? "";

type AuthState = { ready: boolean; authenticated: boolean };
const KeycloakContext = createContext<AuthState>({
  ready: false,
  authenticated: false,
});

export const useAuth = () => useContext(KeycloakContext);

export function KeycloakProvider({ children }: { children: ReactNode }) {
  const setToken = useSetAtom(tokenAtom);
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // On any wallet API 401 the token is no longer accepted, so clear it and send
  // the user to /login?expired=1. Scoped to the wallet API URL; one shared axios
  // interceptor covers every call.
  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        const url = `${error?.config?.baseURL ?? ""}${error?.config?.url ?? ""}`;
        if (status === 401 && WALLET_API && url.startsWith(WALLET_API)) {
          try {
            sessionStorage.removeItem("token");
          } catch {
            /* ignore */
          }
          window.location.assign("/login?expired=1");
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, []);

  useEffect(() => {
    let active = true;
    initKeycloak()
      .then((auth) => {
        if (!active) return;
        const kc = getKeycloak();
        setAuthenticated(Boolean(auth));
        if (auth && kc?.token) {
          // Mirror the Keycloak token into tokenAtom so existing consumers
          // (protected layout, wallet API hooks) keep working unchanged.
          setToken(kc.token ?? null);
          kc.onTokenExpired = () => {
            kc.updateToken(30)
              .then((refreshed) => {
                if (refreshed && kc.token) setToken(kc.token);
              })
              .catch(() => setToken(null));
          };
        }
        // If not authenticated, leave any persisted token in place so a full-page
        // reload (e.g. navigating directly to /wallet) keeps the session. The token
        // is cleared explicitly on logout (/logout).
        setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
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
