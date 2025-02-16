"use client";

import React from "react";
import { Avatar } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface ProfileAvatarProps {
  name: string;
  profileImageUrl?: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/); // Split by whitespace
  if (parts.length === 1) return parts[0][0].toUpperCase(); // Single name case
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase(); // First + Last initials
};

export default function ProfileAvatar({
  name,
  profileImageUrl,
}: ProfileAvatarProps) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Avatar
        src={profileImageUrl}
        alt={name}
        sx={{
          width: 100,
          height: 100,
          fontSize: 40,
          bgcolor: profileImageUrl ? "transparent" : "white",
          color: "black",
          border: "1px solid black",
        }}>
        {!profileImageUrl && getInitials(name)}
      </Avatar>
      <QrCodeIcon
        sx={{
          fontSize: 25,
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: "translate(30%, 60%)",
          color: "green",
        }}
      />
    </div>
  );
}
