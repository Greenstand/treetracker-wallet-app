'use client';
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  iconSrc?: string;
  variantType?: 'primary' | 'social';
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variantType',
})<CustomButtonProps>(({ theme, variantType }) => {
  const isPrimary = variantType === 'primary';

  return {
    width: "calc(273px + (227) * ((100vw - 305px) / (550 - 305)))",
    maxWidth: "400px",
    height: "42px",
    padding: theme.spacing(1, 3),
    marginBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    border: "1px solid",
    transition: theme.transitions.create(["background-color", "border-color", "color"], {
      duration: theme.transitions.duration.short,
    }),
    backgroundColor: isPrimary ? theme.palette.primary.main : theme.palette.common.white,
    color: variantType === 'primary' ? theme.palette.common.white : theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&.Mui-disabled": {
      backgroundColor: isPrimary ? theme.palette.action.disabledBackground : theme.palette.action.disabledBackground,
      color: theme.palette.text.disabled,
      borderColor: theme.palette.action.disabledBackground,
    },
  };
});

export default function CustomButton({
  children,
  iconSrc,
  disabled = false,
  onClick,
  variantType = 'social',
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      variant={disabled ? "outlined" : "contained"}
      color="primary"
      disabled={disabled}
      variantType={variantType}
      onClick={onClick}
      {...props}
    >
      {iconSrc && <img src={iconSrc} alt="button icon" style={{ marginRight: '8px' }} />}
      {children}
    </StyledButton>
  );
}
