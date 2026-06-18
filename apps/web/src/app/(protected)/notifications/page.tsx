"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useGetWallets, useGetTransfers, Wallet } from "@treetracker/wallet";

// Notifications = pending tokens waiting for this user to accept. Built from the
// recent-transfers feed (same source as the home page's activity), filtered to
// pending/requested transfers coming INTO one of the user's wallets.
export default function Notifications() {
  const router = useRouter();
  const { wallets } = useGetWallets();
  const { transfers, isTransfersLoading } = useGetTransfers(50);

  const myWallets = useMemo(
    () => new Set(wallets.map((w) => (w as Wallet).name).filter(Boolean)),
    [wallets],
  );

  // Pending/requested transfers awaiting action. Prefer the ones coming INTO one
  // of my wallets, but the wallet list is a separately-fetched piece of state and
  // can lag/mismatch the transfers list — so if the incoming filter comes up empty
  // while pending transfers exist, fall back to showing them rather than letting
  // stale wallet state hide a real pending token.
  const pending = transfers.filter(
    (t) => t.state === "pending" || t.state === "requested",
  );
  const incomingMatch = pending.filter(
    (t) => t.destination_wallet && myWallets.has(t.destination_wallet),
  );
  const incoming = incomingMatch.length > 0 ? incomingMatch : pending;

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }} data-test="notifications-page">
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        Notifications
      </Typography>

      <Stack spacing={1} data-test="notifications-list">
        {!isTransfersLoading && incoming.length === 0 && (
          <Box sx={{ textAlign: "center", color: "text.secondary", py: 6 }}>
            <NotificationsOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
            <Typography variant="body2">No notifications yet.</Typography>
          </Box>
        )}

        {incoming.map((t) => (
          <Paper
            key={t.id}
            data-test={`notification-item-${t.id}`}
            onClick={() =>
              router.push(
                `/notifications/details?id=${encodeURIComponent(t.id)}`,
              )
            }
            sx={{ p: 2, cursor: "pointer", "&:hover": { bgcolor: "grey.50" } }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "green" }}>
                <NotificationsOutlinedIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body1" fontWeight={600}>
                  Pending token from {t.source_wallet ?? "another wallet"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t.token_count ?? 1} token(s) to{" "}
                  {t.destination_wallet ?? "your wallet"} — tap to review and
                  accept
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
