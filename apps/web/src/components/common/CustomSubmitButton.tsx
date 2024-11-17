"use client";

import * as React from "react";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained"; // Add variant prop
}

const CustomSubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isDisabled,
  onClick,
  variant = "contained", // Default to "contained" variant
}) => {
  return (
    <Button
      type="submit"
      variant={variant} // Use the variant prop
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
