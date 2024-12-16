"use client";

import React from "react";
import { Typography, Box } from "@mui/material";

export default function Settings() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Typography variant="h4">Settings Page</Typography>
    </Box>
  );
}
