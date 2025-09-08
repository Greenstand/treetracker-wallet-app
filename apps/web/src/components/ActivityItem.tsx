"use client";

import * as React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";

const getInitials = (name: string) => {
  const words = name.split(" ");
  return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
};

export function ActivityItem({
  title,
  amount,
  status,
  onClick,
}: {
  title: string;
  amount?: number;
  status?: string;
  onClick?: () => void;
}) {
  return (
    <Card
      data-cy="wallet-item"
      sx={{
        my: 0.5,
        px: 0.5,
        py: 1,
        pt: 2,
        pb: 2,
        flex: 1,
        minWidth: "80%",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick ? { backgroundColor: "grey.50" } : {},
      }}
      onClick={onClick}
      variant="outlined">
      <CardContent sx={{ py: 0.5, "&:last-child": { pb: 0.5 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 40, height: 40 }}>{getInitials(title)}</Avatar>

          {/* Restaurant Name & Status */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {status}
            </Typography>
          </Box>

          {amount !== undefined && (
            <Typography
              variant="h6"
              color={
                amount > 0 && status !== "Pending" ? "green" : "textSecondary"
              }>
              {status === "Pending" ? "" : amount > 0 ? "+" : ""}
              {amount}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
