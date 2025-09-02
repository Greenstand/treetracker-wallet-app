"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface QRCodeDisplayProps {
  walletAddress: string;
  action: "send" | "request";
}

export default function QRCodeDisplay({
  walletAddress,
  action,
}: QRCodeDisplayProps) {
  return (
    <Box sx={{ p: 3, textAlign: "center", pb: 12, minHeight: "100%" }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "normal" }}>
        {action === "send" ? "Send to" : "Request from"} QR Code
      </Typography>

      <Box
        sx={{
          width: 200,
          height: 200,
          mx: "auto",
          mb: 3,
          backgroundColor: "white",
          border: "2px solid #ddd",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <QrCodeIcon sx={{ fontSize: 120, color: "grey.500" }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
        Wallet Address:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 4,
          p: 2,
          backgroundColor: "grey.100",
          borderRadius: 1,
          fontFamily: "monospace",
          wordBreak: "break-all",
        }}>
        {walletAddress}
      </Typography>

      <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
        {action === "send"
          ? "Scan this QR code to send tokens to this wallet"
          : "Show this QR code to request tokens"}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          py: 2,
          fontWeight: "bold",
          mb: 2,
        }}>
        Share QR Code
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          py: 2,
          fontWeight: "bold",
        }}>
        Copy Address
      </Button>
    </Box>
  );
}
