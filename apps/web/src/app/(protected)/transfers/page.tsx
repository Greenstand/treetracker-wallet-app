"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  useGetWallets,
  usePendingTransfers,
  useGetTransfers,
  Wallet,
  Transfer,
} from "@treetracker/wallet";

function TransferRow({
  t,
  direction,
  onAccept,
  onDecline,
  onCancel,
  onClick,
}: {
  t: Transfer;
  direction?: "incoming" | "outgoing";
  onAccept?: () => void;
  onDecline?: () => void;
  onCancel?: () => void;
  onClick?: () => void;
}) {
  return (
    <Paper
      sx={{ p: 2, cursor: onClick ? "pointer" : "default" }}
      data-test={`transfer-item-${t.id}`}
      onClick={onClick}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {t.source_wallet ?? "—"} → {t.destination_wallet ?? "—"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t.token_count ?? 0} token(s)
            {t.created_at
              ? ` · ${new Date(t.created_at).toLocaleString()}`
              : ""}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip size="small" label={t.state} data-test={`transfer-state-${t.id}`} />
          {onAccept && (
            <Button
              size="small"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                onAccept();
              }}
              data-test={`transfer-accept-${t.id}`}
            >
              Accept
            </Button>
          )}
          {onDecline && (
            <Button
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDecline();
              }}
              data-test={`transfer-decline-${t.id}`}
            >
              Decline
            </Button>
          )}
          {onCancel && (
            <Button
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              data-test={`transfer-cancel-${t.id}`}
            >
              Cancel
            </Button>
          )}
          {direction && (
            <Typography variant="caption" color="text.secondary">
              {direction}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function TransfersPage() {
  const router = useRouter();
  const { wallets } = useGetWallets();
  const { transfers: pending, accept, decline, cancel } = usePendingTransfers();
  const { transfers: history } = useGetTransfers(20);
  const [busy, setBusy] = useState(false);

  const myWallets = useMemo(
    () =>
      new Set(wallets.map((w) => (w as Wallet).name).filter(Boolean)),
    [wallets],
  );

  const incoming = pending.filter(
    (t) => t.destination_wallet && myWallets.has(t.destination_wallet),
  );
  const outgoing = pending.filter(
    (t) => t.source_wallet && myWallets.has(t.source_wallet),
  );

  const run = (fn: (id: string) => Promise<void>) => async (id: string) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn(id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ p: 2 }} data-test="transfers-page">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Transfers
        </Typography>
        <Button variant="text" onClick={() => router.push("/send")} sx={{ color: "green" }}>
          + Send
        </Button>
      </Stack>

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2 }}>
        Incoming (awaiting your action)
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-incoming">
        {incoming.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No incoming transfers.
          </Typography>
        )}
        {incoming.map((t) => (
          <TransferRow
            key={t.id}
            t={t}
            onAccept={() => run(accept)(t.id)}
            onDecline={() => run(decline)(t.id)}
          />
        ))}
      </Stack>

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 3 }}>
        Outgoing (pending)
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-outgoing">
        {outgoing.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No outgoing pending transfers.
          </Typography>
        )}
        {outgoing.map((t) => (
          <TransferRow key={t.id} t={t} onCancel={() => run(cancel)(t.id)} />
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" fontWeight={500}>
        Recent transfers
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-history">
        {history.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No transfers yet.
          </Typography>
        )}
        {history.map((t) => (
          <TransferRow
            key={t.id}
            t={t}
            onClick={() =>
              router.push(`/transfers/details?id=${encodeURIComponent(t.id)}`)
            }
          />
        ))}
      </Stack>
    </Box>
  );
}
