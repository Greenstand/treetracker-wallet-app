"use client";
import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BottomNavigationBar() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/send");
        break;
      case 2:
        router.push("/settings");
        break;
      default:
        break;
    }
  };

  return (
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
          label="Send"
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
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
