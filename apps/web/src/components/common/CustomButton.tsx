'use client';
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  iconSrc?: string;
  variantType?: 'primary' | 'social';
}

const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'variantType' })<CustomButtonProps>(({ theme, variantType }) => ({
  width: "calc(273px + (227) * ((100vw - 305px) / (550 - 305)))",
  maxWidth: "400px",
  height: "42px",
  padding: theme.spacing(1, 3),
  marginBottom: "17px",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid",
  transition: theme.transitions.create(["background-color", "border-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  backgroundColor: variantType === 'primary' ? 'var(--primary-main, #61892F)' : '#FFFFFF',
  color: variantType === 'primary' ? theme.palette.common.white : '#61892F',
  borderColor: variantType === 'primary' ? 'var(--primary-main, #61892F)' : '#61892F',
  "&:hover": {
    backgroundColor: variantType === 'primary' ? '#4a6b24' : 'rgba(97, 137, 47, 0.1)',
  },
  "&.Mui-disabled": {
    backgroundColor: variantType === 'primary' ? 'var(--action-disabledBackground, #0000001F)' : '#0000001F',
    color: theme.palette.text.disabled,
    borderColor: variantType === 'primary' ? 'var(--action-disabledBackground, #0000001F)' : '#0000001F',
  },
}));

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
      {iconSrc && <img src={iconSrc} alt="" style={{ marginRight: '8px' }} />}
      {children}
    </StyledButton>
  );
}
