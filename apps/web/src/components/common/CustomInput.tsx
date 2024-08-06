"use client";
import React, { useState } from "react";
import {
  Input,
  InputProps,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomInputProps extends InputProps {
  placeholderText: string;
  onClear?: () => void;
  showPasswordIcon?: boolean;
}

const StyledInput = styled(Input)(({ theme }) => ({
  width: "calc(273px + (227) * ((100vw - 305px) / (550 - 305)))",
  maxWidth: "400px",
  height: "56px",
  padding: theme.spacing(1, 1),
  backgroundColor: theme.palette.grey[200],
  marginBottom: theme.spacing(2.5),
  boxSizing: "border-box",
  margin: "0 auto",
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(1.5),
  },
}));

export default function CustomInput({
  placeholderText,
  onClear,
  showPasswordIcon = false,
  type = "text",
  ...props
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isPasswordField = showPasswordIcon && type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <StyledInput
      placeholder={placeholderText}
      type={inputType}
      value={props.value}
      onChange={props.onChange}
      endAdornment={
        <InputAdornment position="end">
          {typeof props.value === "string" && props.value.length > 0 && (
            <>
              {onClear && (
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={onClear}
                  edge="end"
                  aria-label="Clear Input"
                >
                  <img src="/icons/clear_input.svg" alt="Clear Input" />
                </IconButton>
              )}
              {isPasswordField && (
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={togglePasswordVisibility}
                  edge="end"
                  aria-label={
                    showPassword ? "Hide Password" : "Show Password"
                  }
                >
                  <img
                    src={
                      showPassword
                        ? "/icons/visibility_off.svg"
                        : "/icons/visibility_on.svg"
                    }
                    alt={showPassword ? "Hide Password" : "Show Password"}
                  />
                </IconButton>
              )}
            </>
          )}
        </InputAdornment>
      }
      {...props}
    />
  );
}
