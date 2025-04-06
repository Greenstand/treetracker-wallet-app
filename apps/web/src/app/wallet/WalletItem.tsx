"use client";

import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function WalletItem({
  name,
  createdAt,
  amount,
}: {
  name: string;
  createdAt: string;
  amount: number;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Box>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {createdAt}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography color="green">{amount}</Typography>
        <Button variant="text" sx={{ color: "green", minWidth: "auto" }}>
          <ChevronRightIcon fontSize="small" />
        </Button>
      </Box>
    </Paper>
  );
}
