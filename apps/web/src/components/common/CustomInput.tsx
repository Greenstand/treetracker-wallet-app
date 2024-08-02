"use client";
import React, { useState } from "react";
import { Input, InputProps, IconButton, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomInputProps extends InputProps {
  placeholderText: string;
  onClear?: () => void;
  showPasswordIcon?: boolean;
  iconSrc?: string;
}

const StyledInput = styled(Input)(({ theme }) => ({
  width: "calc(273px + (227) * ((100vw - 305px) / (550 - 305)))",
  maxWidth: "400px",
  height: "56px",
  padding: theme.spacing(1, 1),
  backgroundColor: "#f0f0f0",
  marginBottom: "20px",
  boxSizing: "border-box",
  margin: "0 auto",
  "& .MuiInputBase-input": {
    paddingLeft: "12px",
  },
}));

export default function CustomInput({
  placeholderText,
  onClear,
  showPasswordIcon = false,
  ...props
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isPasswordField = showPasswordIcon && props.type === "password";
  const inputType = isPasswordField && showPassword ? "text" : props.type;

  return (
    <StyledInput
      placeholder={placeholderText}
      type={inputType}
      value={props.value}
      onChange={props.onChange}
      endAdornment={
        <InputAdornment position="end">
          <>
            {props.value && onClear && (
              <IconButton sx={{ mr: 1 }} onClick={onClear} edge="end">
                <img src="/icons/clean_input.svg" alt="Clean Input" />
              </IconButton>
            )}
            {isPasswordField && props.value && props.value.toString().length > 0 && (
              <IconButton sx={{ mr: 1 }} onClick={togglePasswordVisibility} edge="end">
                <img
                  src={
                    showPassword ? "/icons/visibility_off.svg" : "/icons/visibility.svg"
                  }
                  alt={showPassword ? "Hide Password" : "Show Password"}
                />
              </IconButton>
            )}
          </>
        </InputAdornment>
      }
      {...props}
    />
  );
}
