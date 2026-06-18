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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useGetTransfer,
  acceptTransfer,
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

  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [receivedTokenId, setReceivedTokenId] = useState<string | null>(null);

  const accepted = receivedTokenId !== null;

  async function onAccept() {
    if (accepting || !authToken) return;
    setAccepting(true);
    setAcceptError(null);
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
      setAcceptError(e instanceof Error ? e.message : "Failed to accept");
    } finally {
      setAccepting(false);
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
        <Typography variant="body2" color="error" data-test="message-detail-error">
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

      {!accepted ? (
        <>
          {acceptError && (
            <Typography
              variant="body2"
              color="error"
              data-test="message-accept-error"
            >
              {acceptError}
            </Typography>
          )}
          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={accepting || isLoading}
            onClick={onAccept}
            sx={{ mt: 2, textTransform: "uppercase" }}
            data-test="message-accept"
          >
            {accepting ? "Accepting…" : "Accept"}
          </Button>
        </>
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
