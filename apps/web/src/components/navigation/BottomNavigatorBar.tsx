"use client";
import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ChooseAction from "./ChooseAction";

export default function BottomNavigationBar() {
  const [value, setValue] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const router = useRouter();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/wallet");
        break;
      case 2:
        setOpenDrawer(true);
        break;
      case 3:
        router.push("/notifications");
        break;
      case 4:
        router.push("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme => theme.zIndex.appBar,
          overflow: "visible", // Allow overflow
        }}
        elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => handleNavigation(newValue)}
          showLabels>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Wallet"
            icon={<AccountBalanceWalletIcon />}
          />
          <BottomNavigationAction
            label=""
            icon={
              <Image
                src="/assets/images/send.svg"
                alt="Send"
                width={44}
                height={44}
                style={{
                  position: "relative",
                  top: "-10px", // Move the image up
                }}
              />
            }
            sx={{
              position: "relative", // Relative positioning for custom styling
              top: "-10px", // Adjust to push the button partially out
              zIndex: 1, // Ensure it appears above other elements
            }}
          />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsIcon />}
          />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>

      <ChooseAction open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
}
