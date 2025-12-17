"use client";

import * as React from "react";
import { Container, Box, Button } from "@mui/material";
import Link from "next/link";
import { TokenBalance } from "@/components/TokenBalance";
import { WalletBalance } from "@/components/WalletBalance";
import { RecentActivity } from "@/components/RecentActivity";
import { useSnackbar } from "@/context/SnackbarContext";
import { TransactionSnackbar } from "@/components/TransactionSnackbar";

const activityData = [
  { title: "Restaurant XY", amount: 200, status: "Pending" },
  { title: "Restaurant XY", amount: 100, status: "Received" },
  { title: "Greenstand", amount: -200, status: "Sent" },
];

export default function Page() {
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
        width="100%">
        <TokenBalance tokenCount={1000} />
        <WalletBalance walletAmount={2} />
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
        <Button
          component={Link}
          href="/buy"
          variant="contained"
          color="primary"
          size="large"
          data-test="buy-tokens-button"
          sx={{ px: 4, py: 1.5 }}
        >
          Buy Tokens
        </Button>
      </Box>

      <RecentActivity activityData={activityData} />
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
