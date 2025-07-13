"use client";

import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import ProfileDetails from "../../../../components/ProfileDetails";

export default function Account() {
  const router = useRouter();

  // Mock user data, to be replaced with actual user data later
  const user = {
    name: "John Doe",
    email: "Emailaddress@gmail.com",
    profileImageUrl: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "600px",
        margin: "0 -1em",
        textAlign: "center",
        height: "90vh",
      }}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "16px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}>
        <ProfileAvatar
          name={user.name}
          profileImageUrl={user.profileImageUrl}
        />
        <ProfileDetails name={user.name} email={user.email} />
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ marginTop: 2 }}>
          <Button
            onClick={() => router.push("/settings/activity")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 16px",
              color: "black",
              background: "none",
              border: "none",
              boxShadow: "none",
              textTransform: "none",
              minWidth: "80px",
            }}>
            <NotificationsIcon fontSize="medium" sx={{ color: "gray" }} />
            <Typography variant="body2">Activity</Typography>
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "40px", marginX: 2, fontWeight: "light" }}>
            |
          </Typography>
          <Button
            onClick={() => router.push("/settings/web-map")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 16px",
              color: "black",
              background: "none",
              border: "none",
              boxShadow: "none",
              textTransform: "none",
              minWidth: "80px",
            }}>
            <AccountBalanceWalletOutlinedIcon
              fontSize="medium"
              sx={{ color: "gray" }}
            />
            <Typography variant="body2">Web Map</Typography>
          </Button>
        </Stack>
      </Box>
      <Button
        fullWidth
        onClick={() => router.push("/logout")}
        sx={{
          marginTop: 2,
          backgroundColor: "white",
          textTransform: "none",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
        }}>
        Log Out
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "8px",
          width: "100%",
          textAlign: "center",
          boxSizing: "border-box",
        }}>
        <Typography variant="body2" sx={{ color: "black" }}>
          Member since May 2023
        </Typography>
      </Box>
    </Box>
  );
}
