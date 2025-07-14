"use client";

import * as React from "react";
import { Box, Typography, Stack } from "@mui/material";
import WalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { NotificationItem } from "./NotificationItem";

export function NotificationsList({ notifications }: { notifications: any[] }) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index)); // Toggle selection
  };

  return (
    <Box>
      {notifications.length === 0 ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-20%",
          }}>
          <WalletOutlinedIcon sx={{ fontSize: 80, color: "gray" }} />
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 2 }}>
            Come back here to get information about recent transactions,
            mentions, and much more.
          </Typography>
        </Box>
      ) : (
        // Show notifications list when data is available
        notifications.map((item, index) => (
          <NotificationItem
            key={index}
            title={item.title}
            description={item.description}
            time={item.time}
            thirdParty={item.thirdParty}
            isSelected={selectedIndex === index}
            onSelect={() => handleSelect(index)}
          />
        ))
      )}
    </Box>
  );
}
