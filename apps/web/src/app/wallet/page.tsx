"use client";

import React, { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WalletItem from "./WalletItem";

export default function WalletPage() {
  const [wallets, setWallets] = useState([
    { name: "Wallet 2", createdAt: "May 22, 2024", amount: 0 },
    { name: "Wallet 1", createdAt: "May 16, 2024", amount: 3455 },
  ]);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="flex-start">
        <Button
          variant="text"
          startIcon={<AddIcon />}
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
    </Box>
  );
}
