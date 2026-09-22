"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import {
  acceptTransfer,
  declineTransfer,
  getTransferTokens,
} from "@treetracker/wallet";

// Accept and decline for one incoming transfer. Shared so the two detail
// routes, /notifications/details and /transfers/details, run the same flow
// rather than each growing its own copy.
export default function TransferActions({
  transferId,
  tokens,
  backHref,
  isLoading = false,
}: {
  transferId: string;
  tokens: { id: string }[];
  backHref: string;
  isLoading?: boolean;
}) {
  const router = useRouter();
  const authToken = useAtomValue(tokenAtom);

  const [busy, setBusy] = useState<"accept" | "decline" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [receivedTokenId, setReceivedTokenId] = useState<string | null>(null);
  const [declined, setDeclined] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const accepted = receivedTokenId !== null;

  async function onAccept() {
    if (busy || !authToken) return;
    setBusy("accept");
    setActionError(null);
    try {
      await acceptTransfer(authToken, transferId);
      // After accept, the transfer is completed and its transactions point at
      // the tokens that actually landed in the wallet. For a bundle transfer
      // these are different ids than the pre-accept transfer tokens, so
      // re-fetch to report a real, wallet-resident token id.
      let tokenId = tokens[0]?.id ?? transferId;
      try {
        const res = await getTransferTokens(authToken, transferId);
        const creditedId = res?.tokens?.[0]?.id;
        if (creditedId) tokenId = creditedId;
      } catch {
        // keep the fallback id if the re-fetch fails
      }
      setReceivedTokenId(tokenId);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to accept");
    } finally {
      setBusy(null);
    }
  }

  // Declining is final and the recipient cannot undo it, so confirm first.
  async function onDecline() {
    setConfirmOpen(false);
    if (busy || !authToken) return;
    setBusy("decline");
    setActionError(null);
    try {
      await declineTransfer(authToken, transferId);
      setDeclined(true);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to decline");
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      {!accepted && !declined ? (
        <>
          {actionError && (
            <Typography
              variant="body2"
              color="error"
              data-test="message-accept-error"
            >
              {actionError}
            </Typography>
          )}
          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={busy !== null || isLoading}
            onClick={onAccept}
            sx={{ mt: 2, textTransform: "uppercase" }}
            data-test="message-accept"
          >
            {busy === "accept" ? "Accepting…" : "Accept"}
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="error"
            disabled={busy !== null || isLoading}
            onClick={() => setConfirmOpen(true)}
            sx={{ mt: 1.5, textTransform: "uppercase" }}
            data-test="message-decline"
          >
            {busy === "decline" ? "Declining…" : "Decline"}
          </Button>
        </>
      ) : declined ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" data-test="declined-confirmation">
            You declined this transfer. The tokens stay with the sender.
          </Alert>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => router.push(backHref)}
            sx={{ mt: 2, color: "green", borderColor: "green" }}
            data-test="declined-back"
          >
            Back
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Alert severity="success" data-test="received-confirmation">
            you received token {receivedTokenId}
          </Alert>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => router.push("/wallet")}
            sx={{ mt: 2, color: "green", borderColor: "green" }}
            data-test="received-view-wallet"
          >
            View your wallet
          </Button>
        </Box>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Decline these tokens?
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 0 }}>
          <Typography variant="body1">
            This cannot be undone. The tokens stay with the sender.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="text"
            sx={{ fontWeight: 600 }}
            data-test="message-decline-cancel"
          >
            KEEP
          </Button>
          <Button
            onClick={onDecline}
            variant="outlined"
            color="error"
            sx={{ fontWeight: 600 }}
            data-test="message-decline-confirm"
          >
            DECLINE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
