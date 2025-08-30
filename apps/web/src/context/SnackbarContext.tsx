"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Transaction {
  action: "send" | "request";
  amount: string;
  walletName: string;
  note: string;
}

interface SnackbarContextType {
  snackbarOpen: boolean;
  lastTransaction: Transaction | null;
  showTransactionSnackbar: (transaction: Transaction) => void;
  hideSnackbar: () => void;
  undoTransaction: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(
    null,
  );

  const showTransactionSnackbar = (transaction: Transaction) => {
    setLastTransaction(transaction);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  const undoTransaction = () => {
    if (lastTransaction) {
      console.log("Transaction undone:", lastTransaction);
      // Here you would typically call an API to undo the transaction
      setSnackbarOpen(false);
      setLastTransaction(null);
    }
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarOpen,
        lastTransaction,
        showTransactionSnackbar,
        hideSnackbar,
        undoTransaction,
      }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}
