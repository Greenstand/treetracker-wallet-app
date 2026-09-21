"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { useGetWallets, Wallet } from "@treetracker/wallet";
import { claimPendingToken, ClaimOutcome } from "@/utils/claimPendingToken";

// A link saved before signing in used to be redeemed only by wallet creation,
// so anyone signing into an existing account never received it, and anyone at
// the wallet limit could never receive it at all. Redeem as soon as the user
// is authenticated and already has a wallet, however they got here. Creating a
// first wallet is handled where it happens, since this component's own wallet
// list does not refetch.
//
// Mounted only when a pending link exists, so the wallet fetch it needs does
// not run on every protected page.
export default function PendingClaimHandler() {
  const authToken = useAtomValue(tokenAtom);
  const { wallets } = useGetWallets();
  const [outcome, setOutcome] = useState<ClaimOutcome>(null);
  const claiming = useRef(false);

  useEffect(() => {
    if (claiming.current || !authToken || wallets.length === 0) return;
    claiming.current = true;

    (async () => {
      const name = (wallets[0] as Wallet).name;
      setOutcome(await claimPendingToken(authToken, name));
    })();
  }, [authToken, wallets]);

  return (
    <Snackbar
      open={Boolean(outcome)}
      autoHideDuration={6000}
      onClose={() => setOutcome(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={outcome?.severity ?? "success"}
        onClose={() => setOutcome(null)}
        data-test="pending-claim-notice"
      >
        {outcome?.message}
      </Alert>
    </Snackbar>
  );
}
