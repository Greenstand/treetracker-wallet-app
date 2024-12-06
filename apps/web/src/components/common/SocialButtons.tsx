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
      color="primary"
      startIcon={icon ? icon : undefined} // Display icon if provided
      onClick={onClick}
      type={type} // Button type, defaults to "button"
    >
      {text}
    </Button>
  );
};

export default SocialButtons;
