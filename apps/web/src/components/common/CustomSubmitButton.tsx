"use client";

import * as React from "react";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
}

const CustomSubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isDisabled,
  onClick,
  variant = "contained",
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      fullWidth
      style={{
        marginTop: "1rem",
      }}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};
export default CustomSubmitButton;
