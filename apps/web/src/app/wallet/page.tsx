"use client";

import React from "react";
import { Typography, Box } from "@mui/material";

export default function Wallet() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Typography variant="h4">Wallet Page</Typography>
    </Box>
  );
}
