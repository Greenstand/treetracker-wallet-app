// components/CustomButton.tsx

import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  text: string;
}

const StyledButton = styled(Button)(({ theme }) => ({
  width: "273px",
  height: "42px",
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,
  border: "1px solid",
  transition: theme.transitions.create(["background-color", "border-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  "&.MuiButton-containedPrimary": {
    backgroundColor: "#61892F",
    color: theme.palette.common.white,
    borderColor: "#61892F80",
    "&:hover": {
      backgroundColor: "#4a6b24",
    },
  },
  "&.MuiButton-outlinedPrimary": {
    backgroundColor: "transparent",
    color: "#61892F",
    borderColor: "#61892F80",
    "&:hover": {
      backgroundColor: "rgba(97, 137, 47, 0.1)",
    },
  },
}));

export default function CustomButton({
  text,
  disabled = false,
  onClick,
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      variant={disabled ? "outlined" : "contained"}
      color="primary"
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {text}
    </StyledButton>
  );
}
