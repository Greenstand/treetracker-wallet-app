"use client";

import React from "react";
import { Avatar } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function ProfileAvatar() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          fontSize: 48,
          bgcolor: "white",
          color: "black",
          border: "1px solid black",
        }}>
        JD
      </Avatar>
      <QrCodeIcon
        sx={{
          fontSize: 25,
          position: "absolute",
          bottom: -15,
          right: -30,
          color: "green",
        }}
      />
    </div>
  );
}
