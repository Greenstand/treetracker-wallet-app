"use client";

import * as React from "react";
import { Typography, Box, Avatar, Stack } from "@mui/material";

const getInitials = (name?: string) => {
  if (!name) return "?";
  const words = name.trim().split(" ");
  return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
};

export function NotificationItem({
  title,
  description,
  time,
  thirdParty,
  isSelected,
  onSelect,
}: {
  title: string;
  description: string;
  time: string;
  thirdParty?: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Box
      sx={{
        py: 3,
        cursor: "pointer",
        backgroundColor: isSelected ? "#f8e4c4" : "transparent",
        transition: "background-color 0.3s ease",
        borderRadius: 1,
      }}
      onClick={onSelect} // Clicking changes selection
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar sx={{ width: 35, height: 35, color: "white", marginTop: 0.5 }}>
          {getInitials(thirdParty)}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}>
            <Typography variant="body1">{title}</Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ marginLeft: 2, marginTop: 0.5 }}>
              {time}
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              display: "block",
              width: "100%",
              flexBasis: "100%",
              marginTop: 0.5,
            }}>
            {description}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
