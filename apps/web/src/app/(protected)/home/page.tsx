"use client";

import * as React from "react";
import { Container, Box } from "@mui/material";
import {
  useGetWallets,
  useGetTransfers,
  type Transfer,
} from "@treetracker/wallet";
import { TokenBalance } from "@/components/TokenBalance";
import { WalletBalance } from "@/components/WalletBalance";
import {
  RecentActivity,
  type ActivityEntry,
} from "@/components/RecentActivity";
import { useSnackbar } from "@/context/SnackbarContext";
import { TransactionSnackbar } from "@/components/TransactionSnackbar";

// Map a wallet-api transfer into the shape RecentActivity/ActivityItem render.
// Direction is decided by whether one of the user's own wallets is the source
// (sent) or destination (received) of the transfer.
function toActivityEntry(
  transfer: Transfer,
  ownWalletNames: Set<string>,
): ActivityEntry {
  const amount = transfer.token_count ?? 0;
  const sentByMe = transfer.source_wallet
    ? ownWalletNames.has(transfer.source_wallet)
    : false;

  const statusByState: Record<string, string> = {
    pending: "Pending",
    requested: "Pending",
    completed: sentByMe ? "Sent" : "Received",
    cancelled: "Cancelled",
    failed: "Failed",
  };
  const status = statusByState[transfer.state] ?? "Unknown";

  if (sentByMe) {
    return {
      title: `Sent to ${transfer.destination_wallet ?? "unknown"}`,
      amount: -amount,
      status,
      showAmount: transfer.state === "completed",
    };
  }
  return {
    title: `Received from ${transfer.source_wallet ?? "unknown"}`,
    amount,
    status,
    showAmount: transfer.state === "completed",
  };
}

export default function Page() {
  const { wallets, isWalletLoading } = useGetWallets();
  const { transfers, isTransfersLoading } = useGetTransfers(5);

  const tokenCount = wallets.reduce(
    (sum: number, w: { tokens_in_wallet?: number }) =>
      sum + (w.tokens_in_wallet ?? 0),
    0,
  );
  const walletAmount = wallets.length;

  const ownWalletNames = React.useMemo(
    () => new Set(wallets.map((w: { name: string }) => w.name).filter(Boolean)),
    [wallets],
  );
  const activityData = React.useMemo(
    () => transfers.map((t) => toActivityEntry(t, ownWalletNames)),
    [transfers, ownWalletNames],
  );

  const {
    snackbarOpen,
    lastTransaction,
    hideSnackbar,
    undoTransaction,
    showTransactionSnackbar,
  } = useSnackbar();

  React.useEffect(() => {
    const pendingTransaction = sessionStorage.getItem("pendingTransaction");
    if (pendingTransaction) {
      try {
        const transaction = JSON.parse(pendingTransaction);
        showTransactionSnackbar(transaction);

        sessionStorage.removeItem("pendingTransaction");
      } catch (error) {
        console.error("Error parsing pending transaction:", error);
        sessionStorage.removeItem("pendingTransaction");
      }
    }
  }, [showTransactionSnackbar]);

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }} data-test="home-page-element">
      <Box
        display="flex"
        flexDirection="row"
        gap={4}
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <TokenBalance tokenCount={tokenCount} isLoading={isWalletLoading} />
        <WalletBalance
          walletAmount={walletAmount}
          isLoading={isWalletLoading}
        />
      </Box>
      <RecentActivity
        activityData={activityData}
        isLoading={isTransfersLoading}
      />
      <TransactionSnackbar
        open={snackbarOpen}
        transaction={
          lastTransaction
            ? { ...lastTransaction, amount: Number(lastTransaction.amount) }
            : null
        }
        onClose={hideSnackbar}
        onUndo={undoTransaction}
      />
    </Container>
  );
}
