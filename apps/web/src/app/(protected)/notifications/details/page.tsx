"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, Stack, Paper, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetTransfer } from "@treetracker/wallet";
import TransferActions from "@/components/TransferActions";

function MessageDetail() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params?.get("id") ?? "";

  const { transfer, tokens, isLoading, error } = useGetTransfer(id);

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

      <TransferActions
        transferId={id}
        tokens={tokens}
        backHref="/notifications"
        isLoading={isLoading}
      />
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
