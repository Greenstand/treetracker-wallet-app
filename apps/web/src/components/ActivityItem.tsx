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
  searchTerm = "",
  isHighlighted = false,
  onClick,
}: {
  title: string;
  amount: number;
  status: string;
  searchTerm?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      sx={{
        my: 0.5,
        p: 1,
        flex: 1,
        minWidth: "80%",
        backgroundColor: isHighlighted ? "#f7e5c4" : "inherit",
        border: isHighlighted ? "1px solid #f7e5c4" : "none",
        cursor: onClick ? "pointer" : "default",
        "&:hover":
          onClick && !isHighlighted
            ? {
              backgroundColor: "#f5f5f5",
            }
            : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ py: 0.5, "&:last-child": { pb: 0.5 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 40, height: 40 }}>{getInitials(title)}</Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {status}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            color={
              amount > 0 && status !== "Pending" ? "green" : "textSecondary"
            }
          >
            {status === "Pending" ? "" : amount > 0 ? "+" : ""}
            {amount}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
