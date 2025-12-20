"use client";

import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function WalletItem({
  name,
  created_at,
  tokens_in_wallet,
}: {
  name: string;
  created_at?: string | undefined;
  tokens_in_wallet?: number | undefined;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="body2" data-test={`wallet-item-name-${name}`}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {created_at}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography color="green">{tokens_in_wallet}</Typography>
        <Button variant="text" sx={{ color: "green", minWidth: "auto" }}>
          <ChevronRightIcon fontSize="small" />
        </Button>
      </Box>
    </Paper>
  );
}
