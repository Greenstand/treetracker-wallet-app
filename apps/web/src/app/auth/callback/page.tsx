"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/KeycloakProvider";
import LoadingSpinner from "@/components/LoadingSpinner";
import { consumeClaimReturnPath } from "@/utils/actionToken";

// Keycloak redirects here with ?code=...; the KeycloakProvider (root layout)
// processes the code during init. Once ready, route to the app.
export default function AuthCallbackPage() {
  const { ready, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!authenticated) {
      router.replace("/login");
      return;
    }

    router.replace(consumeClaimReturnPath() ?? "/home");
  }, [ready, authenticated, router]);

  return <LoadingSpinner />;
}
