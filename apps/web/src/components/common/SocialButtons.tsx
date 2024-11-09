"use client";

import { ReactNode } from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  onClick?: () => void; // Optional click handler
  text: string; // Button text
  icon?: ReactNode; // Optional icon to be displayed
  type?: "submit" | "button"; // Button type, defaults to "button"
}

const SocialButtons: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  type = "button", // Default type is "button"
}) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        borderColor: "rgb(97, 137, 47)", // Green border color
        color: "rgb(97, 137, 47)", // Green text color
        "&:hover": {
          borderColor: "rgb(70, 100, 30)", // Darker green on hover
          backgroundColor: "rgba(97, 137, 47, 0.1)", // Light green background on hover
        },
      }}
      startIcon={icon ? icon : undefined} // Display icon if provided
      onClick={onClick}
      type={type} // Button type, defaults to "button"
    >
      {text}
    </Button>
  );
};

export default SocialButtons;
