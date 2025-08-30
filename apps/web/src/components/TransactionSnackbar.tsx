"use client";

import { Snackbar, Alert, Button } from "@mui/material";

interface Transaction {
  amount: number;
  action: "send" | "request";
}

interface TransactionSnackbarProps {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onUndo: () => void;
}

export function TransactionSnackbar({
  open,
  transaction,
  onClose,
  onUndo,
}: TransactionSnackbarProps) {
  return (
    <Snackbar
      data-test="transaction-snackbar"
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert
        severity="success"
        action={
          <Button
            size="small"
            onClick={onUndo}
            sx={{
              color: "#61892F",
              fontWeight: "bold",
              textTransform: "none",
            }}>
            UNDO
          </Button>
        }
        onClose={onClose}
        sx={{
          backgroundColor: "#323232",
          color: "#fff",
          "& .MuiAlert-message": {
            color: "#fff",
          },
          "& .MuiAlert-icon": {
            color: "#61892F",
          },
          "& .MuiAlert-action": {
            color: "#fff",
          },
          "& .MuiIconButton-root": {
            color: "#fff",
          },
        }}>
        {transaction?.amount} Tokens{" "}
        {transaction?.action === "send" ? "sent!" : "requested!"}
      </Alert>
    </Snackbar>
  );
}
