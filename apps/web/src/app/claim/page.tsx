"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { isNoWalletError, redeemActionToken } from "@treetracker/wallet";
import {
  savePendingActionToken,
  clearPendingActionToken,
} from "@/utils/actionToken";

// Public landing for a shared token link: {BASE_URL}/claim?action_token=<jwt>.
// The recipient may not be registered, so this route is intentionally outside
// the (protected)/(public) auth gates. A signed-out visitor gets the link saved
// and chooses sign in or register; PendingClaimHandler redeems it once they are
// signed in with a wallet, or wallet creation does on their first wallet. A
// signed-in visitor redeems here, because /signup would bounce them to Home and
// strand the token. A signed-in visitor with no wallet yet gets the link saved
// and is sent to create one; wallet creation redeems it.
function Claim() {
  const params = useSearchParams();
  const router = useRouter();
  const authToken = useAtomValue(tokenAtom);
  const [status, setStatus] = useState<
    "working" | "claimed" | "failed" | "needsAuth" | "needsWallet"
  >("working");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const actionToken = params?.get("action_token");
    if (!actionToken) {
      router.replace("/login");
      return undefined;
    }

    if (!authToken) {
      // The session is per tab, so a link opened from a messaging app looks
      // signed out even for an existing user. Offer both, rather than
      // assuming they are new and sending them to register.
      savePendingActionToken(actionToken);
      setStatus("needsAuth");
      return undefined;
    }

    let active = true;
    (async () => {
      try {
        await redeemActionToken(authToken, actionToken);
        if (!active) return;
        // Redeemed here, so nothing must be left for a later wallet creation.
        clearPendingActionToken();
        setStatus("claimed");
      } catch (e) {
        if (!active) return;
        // Signed in, token fine, no wallet yet. Keep the link and send them
        // to create one: wallet creation redeems a pending token into it.
        if (isNoWalletError(e)) {
          savePendingActionToken(actionToken);
          setStatus("needsWallet");
          return;
        }
        setError(
          e instanceof Error ? e.message : "Could not claim the tokens.",
        );
        setStatus("failed");
      }
    })();
    return () => {
      active = false;
    };
  }, [params, router, authToken]);

  if (status === "failed") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600} color="error">
          This link could not be claimed
        </Typography>
        <Typography
          variant="body1"
          color="error"
          sx={{ mt: 1 }}
          data-test="claim-error"
        >
          {error}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.replace("/home")}
          sx={{ mt: 3, color: "green", borderColor: "green" }}
          data-test="claim-home"
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  if (status === "needsAuth") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          You&apos;ve received tokens!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
          Sign in to claim them, or create an account if you are new.
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => router.replace("/login")}
            data-test="claim-sign-in"
          >
            I already have an account
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.replace("/signup")}
            sx={{ color: "green", borderColor: "green" }}
            data-test="claim-register"
          >
            Create an account
          </Button>
        </Stack>
      </Box>
    );
  }

  if (status === "needsWallet") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          You&apos;ve received tokens!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
          Create a wallet to claim these tokens.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.replace("/wallet")}
          sx={{ mt: 3 }}
          data-test="claim-create-wallet"
        >
          Create a wallet
        </Button>
      </Box>
    );
  }

  if (status === "claimed") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }} data-test="claim-page">
        <Typography variant="h6" fontWeight={600}>
          Tokens claimed
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
          The tokens have been added to your wallet.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.replace("/wallet")}
          sx={{ mt: 3 }}
          data-test="claim-view-wallet"
        >
          View your wallets
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, textAlign: "center" }} data-test="claim-page">
      <Typography variant="h6" fontWeight={600}>
        You&apos;ve received tokens!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }} data-test="claim-message">
        Claiming your tokens…
      </Typography>
      <Box sx={{ mt: 3 }} data-test="claim-saved">
        <CircularProgress />
      </Box>
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
