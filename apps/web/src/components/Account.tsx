"use client";

import React from "react";
import { Box, Typography, Avatar, Button, Stack } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();

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
        {/* Avatar and QR Code */}
        <Box sx={{ position: "relative", display: "inline-block" }}>
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
        </Box>

        {/* Name */}
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          John Doe
        </Typography>

        {/* Email */}
        <Typography variant="body2" color="textSecondary">
          Emailaddress@gmail.com
        </Typography>

        <Box sx={{ marginBottom: 3 }} />

        {/* Edit Profile Button */}
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

        <Box sx={{ marginBottom: 3 }} />

        {/* Buttons Row with Icons and Separator */}
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

          {/* Divider with proper height and spacing */}
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

      {/* Logout Button */}
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

      {/* "Member since May 2023" Box */}
      <Box
        sx={{
          backgroundColor: "white",
          justifyContent: "center",
          padding: "8px",
          marginTop: 2,
          width: "100%",
          height: "2vh",
          display: "flex",
          alignItems: "center",
        }}
      />
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
      <Box
        sx={{
          backgroundColor: "white",
          justifyContent: "center",
          padding: "8px",
          width: "100%",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      />
    </Box>
  );
}
