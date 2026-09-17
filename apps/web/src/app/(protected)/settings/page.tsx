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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  const settingsItems = [
    {
      icon: <AccountCircleIcon />,
      text: "Account",
      route: "/settings/account",
      testId: "settings-account-item",
    },
  ];

  return (
    <Box
      data-test="settings-page"
      sx={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <List>
        {settingsItems.map((item) => (
          <React.Fragment key={item.route}>
            <ListItem disablePadding sx={{ backgroundColor: "white" }}>
              <ListItemButton
                data-test={item.testId}
                onClick={() => router.push(item.route)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "inherit",
                    },
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
