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

// Helper function to generate initials from a name
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
}: {
  title: string;
  amount: number;
  status: string;
  searchTerm?: string;
  isHighlighted?: boolean;
}) {
  return (
    <Card
      sx={{
        my: 0.5,
        p: 1,
        flex: 1,
        minWidth: "80%",
        // Highlight card background when search matches
        backgroundColor: isHighlighted ? "#f7e5c4" : "inherit",
        border: isHighlighted ? "1px solid #f7e5c4" : "none",
      }}
    >
      <CardContent sx={{ py: 0.5, "&:last-child": { pb: 0.5 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Avatar with initials */}
          <Avatar sx={{ width: 40, height: 40 }}>{getInitials(title)}</Avatar>

          {/* Title and status section */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {status}
            </Typography>
          </Box>

          {/* Amount with conditional styling */}
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
