"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { savePendingActionToken } from "@/utils/actionToken";

// Public landing for a shared token link: {BASE_URL}/claim?action_token=<jwt>.
// The recipient may not be registered, so this route is intentionally outside
// the (protected)/(public) auth gates. It captures the action token, then sends
// the visitor to register; the token is redeemed on their first wallet creation.
function Claim() {
  const params = useSearchParams();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const actionToken = params?.get("action_token");
    if (actionToken) {
      savePendingActionToken(actionToken);
      setSaved(true);
      const t = setTimeout(() => router.replace("/signup"), 3000);
      return () => clearTimeout(t);
    }
    // Nothing to claim — send to login.
    router.replace("/login");
    return undefined;
  }, [params, router]);

  return (
    <Box sx={{ p: 3, textAlign: "center" }} data-test="claim-page">
      <Typography variant="h6" fontWeight={600}>
        You&apos;ve received tokens!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
        Register and create a wallet to claim your tokens.
      </Typography>
      {saved && (
        <Box sx={{ mt: 3 }} data-test="claim-saved">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 3 }}>Loading…</Box>}>
      <Claim />
    </Suspense>
  );
}
