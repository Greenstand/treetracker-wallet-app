"use client";

import React from "react";
import { Typography, Button } from "@mui/material";

interface ProfileDetailsProps {
  name: string;
  email: string;
}

export default function ProfileDetails({ name, email }: ProfileDetailsProps) {
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {email}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          marginTop: 1,
          paddingX: 2,
          color: "black",
          borderColor: "black",
        }}>
        Edit Profile
      </Button>
    </>
  );
}
