"use client";

import * as React from "react";
import { Typography, Card, CardContent, Stack, Box } from "@mui/material";

interface CustomBalanceCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

export function CustomBalanceCard({
  icon,
  label,
  value,
}: CustomBalanceCardProps) {
  return (
    <Card
      sx={{
        flex: 1,
        minWidth: "45%",
        display: "flex",
        flexDirection: "column",
      }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon}
          <Typography variant="h6" color="textSecondary">
            {label}
          </Typography>
        </Stack>
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h4">{value}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
