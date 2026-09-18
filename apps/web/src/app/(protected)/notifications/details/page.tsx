"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useGetTransfer,
  acceptTransfer,
  declineTransfer,
  getTransferTokens,
} from "@treetracker/wallet";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";

function MessageDetail() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params?.get("id") ?? "";

  const authToken = useAtomValue(tokenAtom);
  const { transfer, tokens, isLoading, error } = useGetTransfer(id);

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
      await acceptTransfer(authToken, id);
      // After accept, the transfer is completed and its transactions point at the
      // tokens that actually landed in the wallet. For a bundle transfer these are
      // different ids than the pre-accept transfer tokens, so re-fetch to report a
      // real, wallet-resident token id.
      let tokenId = tokens[0]?.id ?? id;
      try {
        const res = await getTransferTokens(authToken, id);
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
      await declineTransfer(authToken, id);
      setDeclined(true);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to decline");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Box sx={{ p: 2 }} data-test="message-detail-page">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/notifications")}
        sx={{ color: "green" }}
        data-test="message-detail-back"
      >
        Back
      </Button>

      <Typography variant="h6" fontWeight={600}>
        Pending token
      </Typography>

      <Divider sx={{ my: 2 }} />

      {isLoading && <Typography variant="body2">Loading…</Typography>}
      {error && (
        <Typography
          variant="body2"
          color="error"
          data-test="message-detail-error"
        >
          {error}
        </Typography>
      )}

      {transfer && (
        <Paper sx={{ p: 2 }} data-test="message-detail-info">
          <Stack spacing={0.5}>
            <Typography variant="body2">
              From: {transfer.source_wallet ?? "—"}
            </Typography>
            <Typography variant="body2">
              To: {transfer.destination_wallet ?? "—"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tokens: {transfer.token_count ?? tokens.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              State: {transfer.state}
            </Typography>
          </Stack>
        </Paper>
      )}

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
            onClick={() => router.push("/notifications")}
            sx={{ mt: 2, color: "green", borderColor: "green" }}
            data-test="declined-back"
          >
            Back to notifications
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
            onClick={() =>
              router.push(
                `/wallet/details?name=${encodeURIComponent(
                  transfer?.destination_wallet ?? "",
                )}`,
              )
            }
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
    </Box>
  );
}

export default function MessageDetailPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 2 }}>Loading…</Box>}>
      <MessageDetail />
    </Suspense>
  );
}
