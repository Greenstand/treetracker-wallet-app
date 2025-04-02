"use client";

import { ReactNode } from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  icon?: ReactNode;
  type?: "submit" | "button";
}

const SocialButtons: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  type = "button",
}) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      color="primary"
      startIcon={icon ? icon : undefined}
      onClick={onClick}
      type={type}>
      {text}
    </Button>
  );
};

export default SocialButtons;
