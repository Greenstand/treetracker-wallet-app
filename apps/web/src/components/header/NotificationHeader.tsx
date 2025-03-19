"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";

interface NotificationHeaderProps {
  onCollapse: () => void;
}

export default function NotificationHeader({
  onCollapse,
}: NotificationHeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          onClick={() => {
            onCollapse();
            router.push("/");
          }}
          sx={{
            "&:hover": { backgroundColor: theme => theme.palette.grey[300] },
          }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" noWrap sx={{ color: "text.secondary" }}>
          Notifications
        </Typography>
      </Box>

      <IconButton
        sx={{
          "&:hover": { backgroundColor: theme => theme.palette.grey[300] },
        }}>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}
