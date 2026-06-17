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
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  useGetToken,
  useGetTokenTransactions,
  Transaction,
} from "@treetracker/wallet";

const MAP_URL =
  process.env.NEXT_PUBLIC_MAP_URL ?? "https://dev.treetracker.org";

function TokenDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params?.get("id") ?? "";
  const wallet = params?.get("wallet") ?? "";

  const { token, isTokenLoading, error } = useGetToken(id);
  const { transactions, isLoading: isTxLoading } = useGetTokenTransactions(id);

  return (
    <Box sx={{ p: 2 }} data-test="token-details-page">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() =>
          router.push(
            wallet
              ? `/wallet/details?name=${encodeURIComponent(wallet)}`
              : "/wallet",
          )
        }
        sx={{ color: "green" }}
        data-test="token-details-back"
      >
        Back
      </Button>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight={600}>
          Token details
        </Typography>
        {/* Anchor (not router) so the map opens in a new browser tab. */}
        <Tooltip title="View on map">
          <IconButton
            component="a"
            href={`${MAP_URL}/tokens/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            data-test="token-location-link"
            sx={{ color: "green" }}
          >
            <LocationOnIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {isTokenLoading && <Typography variant="body2">Loading…</Typography>}
      {error && (
        <Typography
          variant="body2"
          color="error"
          data-test="token-details-error"
        >
          {error}
        </Typography>
      )}

      <Paper sx={{ p: 2 }} data-test="token-details-info">
        <Typography variant="body2" data-test="token-details-id">
          ID: {id}
        </Typography>
        {wallet && (
          <Typography variant="body2" color="text.secondary">
            Wallet: {wallet}
          </Typography>
        )}
        {token?.claim !== undefined && (
          <Typography variant="body2" color="text.secondary">
            Claimed: {token.claim ? "Yes" : "No"}
          </Typography>
        )}
        {token?.created_at && (
          <Typography variant="body2" color="text.secondary">
            Created: {new Date(token.created_at).toLocaleString()}
          </Typography>
        )}
      </Paper>

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 3 }}>
        Transaction history
      </Typography>
      {isTxLoading && <Typography variant="body2">Loading…</Typography>}
      <Stack spacing={0.5} sx={{ mt: 1 }} data-test="token-transactions">
        {!isTxLoading && transactions.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No transactions recorded for this token.
          </Typography>
        )}
        {transactions.map((tx: Transaction) => (
          <Paper key={tx.id} sx={{ p: 1.5 }} data-test={`token-tx-${tx.id}`}>
            <Typography variant="body2">
              {(tx.source_wallet_name ?? tx.source_wallet_id ?? "—") +
                " → " +
                (tx.destination_wallet_name ?? tx.destination_wallet_id ?? "—")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {tx.processed_at
                ? new Date(tx.processed_at).toLocaleString()
                : ""}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default function TokenDetailsPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 2 }}>Loading…</Box>}>
      <TokenDetails />
    </Suspense>
  );
}
