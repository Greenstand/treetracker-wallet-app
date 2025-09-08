"use client";

import * as React from "react";
import { Button } from "@mui/material";

interface SubmitButtonProps {
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained"; // Add variant prop
  testId?: string;
}

const CustomSubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isDisabled,
  onClick,
  testId,
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
      disabled={isDisabled}
      data-test={testId}>
      {text}
    </Button>
  );
};
export default CustomSubmitButton;
