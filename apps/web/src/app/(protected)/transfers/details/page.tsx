"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetTransfer } from "@treetracker/wallet";

function TransferDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params?.get("id") ?? "";

  const { transfer, tokens, isLoading, error } = useGetTransfer(id);

  return (
    <Box sx={{ p: 2 }} data-test="transfer-details-page">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/transfers")}
        sx={{ color: "green" }}
        data-test="transfer-details-back"
      >
        Back
      </Button>

      <Typography variant="h6" fontWeight={600}>
        Transfer details
      </Typography>

      <Divider sx={{ my: 2 }} />

      {isLoading && <Typography variant="body2">Loading…</Typography>}
      {error && (
        <Typography variant="body2" color="error" data-test="transfer-details-error">
          {error}
        </Typography>
      )}

      {transfer && (
        <Paper sx={{ p: 2 }} data-test="transfer-details-info">
          <Stack spacing={0.5}>
            <Typography variant="body2" data-test="transfer-details-id">
              ID: {transfer.id}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">State:</Typography>
              <Chip size="small" label={transfer.state} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {transfer.source_wallet ?? "—"} → {transfer.destination_wallet ?? "—"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tokens: {transfer.token_count ?? tokens.length}
            </Typography>
            {transfer.created_at && (
              <Typography variant="body2" color="text.secondary">
                Created: {new Date(transfer.created_at).toLocaleString()}
              </Typography>
            )}
            {transfer.closed_at && (
              <Typography variant="body2" color="text.secondary">
                Closed: {new Date(transfer.closed_at).toLocaleString()}
              </Typography>
            )}
          </Stack>
        </Paper>
      )}

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2 }}>
        Tokens in this transfer
      </Typography>
      <Stack spacing={0.5} sx={{ mt: 1 }} data-test="transfer-token-list">
        {tokens.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No individual tokens listed.
          </Typography>
        )}
        {tokens.map((t) => (
          <Paper
            key={t.id}
            sx={{ p: 1.5, cursor: "pointer" }}
            data-test={`transfer-token-${t.id}`}
            onClick={() => router.push(`/token/details?id=${t.id}`)}
          >
            <Typography variant="body2">{t.id}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default function TransferDetailsPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 2 }}>Loading…</Box>}>
      <TransferDetails />
    </Suspense>
  );
}
