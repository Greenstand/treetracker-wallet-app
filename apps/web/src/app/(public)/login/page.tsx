"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Alert } from "@mui/material";
import LoadingSpinner from "@/components/LoadingSpinner";
import { login } from "@/auth/keycloak";

// Redirect to Keycloak's hosted login on mount (ref guard avoids a double
// redirect under strict mode). With ?expired=1, show a notice + button instead.
export default function LoginPage() {
  const redirected = useRef(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const isExpired =
      new URLSearchParams(window.location.search).get("expired") === "1";
    if (isExpired) {
      setExpired(true);
      return;
    }
    if (redirected.current) return;
    redirected.current = true;
    login();
  }, []);

  if (!expired) {
    return (
      <Box data-test="login-redirect">
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Stack
      data-test="login-expired"
      spacing={2}
      sx={{ minHeight: "60vh", justifyContent: "center", px: 2 }}
    >
      <Alert severity="warning">
        Your session is no longer valid — please log in again.
      </Alert>
      <Button
        variant="contained"
        onClick={() => login()}
        data-test="login-again"
      >
        Log in again
      </Button>
    </Stack>
  );
}
