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
  useActionTokens,
  Wallet,
  Transfer,
  ActionTokenSummary,
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
          <Chip
            size="small"
            label={t.state}
            data-test={`transfer-state-${t.id}`}
          />
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

function ListStatus({
  isLoading,
  error,
  empty,
  onRetry,
  testId,
}: {
  isLoading: boolean;
  error: string | null;
  empty: string | null;
  onRetry: () => void;
  testId: string;
}) {
  if (isLoading) return <Typography variant="body2">Loading…</Typography>;
  if (error)
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" color="error" data-test={testId}>
          {error}
        </Typography>
        <Button size="small" onClick={onRetry} data-test={`${testId}-retry`}>
          Retry
        </Button>
      </Stack>
    );
  if (empty)
    return (
      <Typography variant="body2" color="text.secondary">
        {empty}
      </Typography>
    );
  return null;
}

function ShareLinkRow({
  link,
  onCancel,
}: {
  link: ActionTokenSummary;
  onCancel?: () => void;
}) {
  return (
    <Paper sx={{ p: 2 }} data-test={`share-link-item-${link.id}`}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {link.token_count} token(s)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {link.state === "active"
              ? `Expires ${new Date(link.expires_at).toLocaleString()}`
              : link.redeemed_at
                ? `Redeemed ${new Date(link.redeemed_at).toLocaleString()}`
                : `Created ${new Date(link.created_at).toLocaleString()}`}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            size="small"
            label={link.state}
            data-test={`share-link-state-${link.id}`}
          />
          {onCancel && link.state === "active" && (
            <Button
              size="small"
              color="error"
              onClick={onCancel}
              data-test={`share-link-cancel-${link.id}`}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function TransfersPage() {
  const router = useRouter();
  const { wallets } = useGetWallets();
  const {
    transfers: pending,
    isLoading: isPendingLoading,
    error: pendingError,
    reload: reloadPending,
    cancel,
  } = usePendingTransfers();
  const {
    transfers: history,
    isTransfersLoading,
    error: historyError,
    reload: reloadHistory,
  } = useGetTransfers(20);
  const {
    links,
    isLoading: isLinksLoading,
    error: linksError,
    reload: reloadLinks,
    cancel: cancelLink,
  } = useActionTokens();
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const myWallets = useMemo(
    () => new Set(wallets.map((w) => (w as Wallet).name).filter(Boolean)),
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
    setActionError(null);
    try {
      await fn(id);
      // The pending hook reloads itself; the history list needs telling.
      await reloadHistory();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Action failed. Please try again.",
      );
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
        <Button
          variant="text"
          onClick={() => router.push("/send")}
          sx={{ color: "green" }}
        >
          + Send
        </Button>
      </Stack>

      {actionError && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 1 }}
          data-test="transfers-action-error"
        >
          {actionError}
        </Typography>
      )}

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2 }}>
        Incoming (awaiting your action)
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-incoming">
        <ListStatus
          isLoading={isPendingLoading}
          error={pendingError}
          empty={incoming.length === 0 ? "No incoming transfers." : null}
          onRetry={reloadPending}
          testId="transfers-incoming-error"
        />
        {incoming.map((t) => (
          <TransferRow
            key={t.id}
            t={t}
            onClick={() =>
              router.push(`/transfers/details?id=${encodeURIComponent(t.id)}`)
            }
          />
        ))}
      </Stack>

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 3 }}>
        Outgoing (pending)
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-outgoing">
        <ListStatus
          isLoading={isPendingLoading}
          error={pendingError}
          empty={
            outgoing.length === 0 ? "No outgoing pending transfers." : null
          }
          onRetry={reloadPending}
          testId="transfers-outgoing-error"
        />
        {outgoing.map((t) => (
          <TransferRow key={t.id} t={t} onCancel={() => run(cancel)(t.id)} />
        ))}
      </Stack>

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 3 }}>
        Share links
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-share-links">
        <ListStatus
          isLoading={isLinksLoading}
          error={linksError}
          empty={links.length === 0 ? "No share links." : null}
          onRetry={reloadLinks}
          testId="transfers-share-links-error"
        />
        {links.map((link) => (
          <ShareLinkRow
            key={link.id}
            link={link}
            onCancel={() => run(cancelLink)(link.id)}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" fontWeight={500}>
        Recent transfers
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }} data-test="transfers-history">
        <ListStatus
          isLoading={isTransfersLoading}
          error={historyError}
          empty={history.length === 0 ? "No transfers yet." : null}
          onRetry={reloadHistory}
          testId="transfers-history-error"
        />
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
