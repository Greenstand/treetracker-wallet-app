"use client";

import React from "react";
import { Typography, Button } from "@mui/material";

export default function ProfileDetails() {
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        John Doe
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Emailaddress@gmail.com
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
