"use client";

import { useEffect } from "react";
import { clearStoredTokens, initKeycloak, logout } from "@/auth/keycloak";
import { broadcastLogout } from "@/auth/sessionChannel";
import LoadingSpinner from "@/components/LoadingSpinner";

// Logs out of Keycloak (clears the SSO session) and redirects to /login.
export default function LogoutPage() {
  useEffect(() => {
    (async () => {
      // Clear the mirrored access token and the stored refresh pair first.
      try {
        sessionStorage.removeItem("token");
      } catch {
        /* ignore */
      }
      clearStoredTokens();
      broadcastLogout();
      // Ensure Keycloak is initialized (endpoints + current session/tokens
      // loaded) BEFORE logging out — on a fresh /logout page load, calling
      // logout() before init can't build a proper end-session redirect and the
      // page just stalls. Awaiting init makes logout reliably clear the SSO
      // session and redirect to /login.
      try {
        await initKeycloak();
      } catch {
        /* ignore — still attempt logout below */
      }
      logout();
    })();
  }, []);

  return <LoadingSpinner />;
}
