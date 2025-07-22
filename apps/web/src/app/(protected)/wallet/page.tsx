"use client";

import { useState } from "react";
import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import WalletItem from "@/components/WalletItem";
import GenericDrawer from "@/components/GenericDrawer";

export default function WalletPage() {
  const [wallets, setWallets] = useState([
    { name: "Wallet 2", createdAt: "May 22, 2024", amount: 0 },
    { name: "Wallet 1", createdAt: "May 16, 2024", amount: 3455 },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{ color: "green", fontSize: "1rem", fontWeight: 500 }}>
          CREATE WALLET
        </Button>
        <IconButton
          aria-label="More wallet information"
          onClick={() => setIsDrawerOpen(true)}
          sx={{ color: "#2226298F" }}>
          <InfoIcon sx={{ width: "20px" }} />
        </IconButton>
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

      <GenericDrawer
        open={isDrawerOpen}
        title="Good-to-know"
        onClose={() => setIsDrawerOpen(false)}>
        <Typography variant="body1" color="textPrimary">
          You can have up to 2 wallets.
        </Typography>
      </GenericDrawer>
    </Box>
  );
}
