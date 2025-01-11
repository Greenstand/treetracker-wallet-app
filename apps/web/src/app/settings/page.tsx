"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTipOutlined";
import GavelIcon from "@mui/icons-material/ClassOutlined";
import SupportIcon from "@mui/icons-material/ContactSupportOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import FeedbackIcon from "@mui/icons-material/CommentOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  const settingsItems = [
    {
      icon: <AccountCircleIcon />,
      text: "Account",
      route: "/settings/account",
    },
    {
      icon: <NotificationsIcon />,
      text: "Notifications",
      route: "/settings/notifications",
    },
    {
      icon: <PrivacyTipIcon />,
      text: "Data and Privacy",
      route: "/settings/data-privacy",
    },
    { icon: <GavelIcon />, text: "Legal", route: "/settings/legal" },
    { icon: <SupportIcon />, text: "Support", route: "/settings/support" },
    { icon: <InfoIcon />, text: "About", route: "/settings/about" },
    {
      icon: <FeedbackIcon />,
      text: "Send Feedback",
      secondaryText: "Version 1.0",
      route: "/settings/feedback",
    },
  ];

  return (
    <Box
      sx={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto",
      }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <List>
        {settingsItems.map(item => (
          <React.Fragment key={item.route}>
            <ListItem disablePadding sx={{ backgroundColor: "white" }}>
              <ListItemButton onClick={() => router.push(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary={item.secondaryText || null}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: item.secondaryText ? "normal" : "inherit",
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: { fontSize: "0.8em", color: "gray" },
                  }}
                />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/logout")}>
            <ListItemText
              primary="log out"
              primaryTypographyProps={{
                sx: {
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
