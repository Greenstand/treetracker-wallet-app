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
  created_at?: Date | undefined;
  tokens_in_wallet?: number | undefined;
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
          {created_at?.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
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
