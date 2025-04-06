"use client";

import React, { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WalletItem from "./WalletItem";
import CreateWalletDrawer from "./CreateWalletDrawer";

export default function WalletPage() {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [wallets, setWallets] = useState([
    { name: "Wallet 2", createdAt: "May 22, 2024", amount: 0 },
    { name: "Wallet 1", createdAt: "May 16, 2024", amount: 3455 },
  ]);

  const handleAddWallet = (newWallet: {
    name: string;
    description?: string;
  }) => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setWallets(prevWallets => [
      ...prevWallets,
      { name: newWallet.name, createdAt: today, amount: 0 },
    ]);
    setOpenCreateDrawer(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="flex-start">
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateDrawer(true)}
          sx={{ color: "green", fontSize: "1rem", fontWeight: 500 }}>
          CREATE WALLET
        </Button>
      </Box>
      <Box sx={{ height: 10 }} />
      <Typography variant="h6" fontWeight={500}>
        Your Wallets
      </Typography>
      <Stack spacing={0.5}>
        {wallets.map((wallet, idx) => (
          <WalletItem key={idx} {...wallet} />
        ))}
      </Stack>

      <CreateWalletDrawer
        open={openCreateDrawer}
        onClose={() => setOpenCreateDrawer(false)}
        wallets={wallets}
        onAddWallet={handleAddWallet}
      />
    </Box>
  );
}
