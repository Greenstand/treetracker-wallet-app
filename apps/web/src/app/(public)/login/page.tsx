"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import LoadingSpinner from "@/components/LoadingSpinner";
import { login } from "@/auth/keycloak";

// Login is handled by Keycloak's hosted login page. Redirect there once on mount
// (ref guard avoids a double redirect under React strict mode).
export default function LoginPage() {
  const redirected = useRef(false);
  useEffect(() => {
    if (redirected.current) return;
    redirected.current = true;
    login();
  }, []);

  return (
    <Box data-test="login-redirect">
      <LoadingSpinner />
    </Box>
  );
}
