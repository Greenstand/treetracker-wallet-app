"use client";
import React, { useState } from "react";
import {
  TextField,
  TextFieldProps,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomInputProps extends Omit<TextFieldProps, "variant"> {
  placeholderText: string;
  onClear?: () => void;
  showPasswordIcon?: boolean;
  variant?: "filled" | "outlined" | "standard";
}

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "calc(273px + (227 * (100vw - 305px) / (550 - 305)))",
  maxWidth: "400px",
  backgroundColor: theme.palette.grey[200],
  marginBottom: theme.spacing(2.5),
  boxSizing: "border-box",
  margin: "0 auto",
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(1.5),
    height: "100%",
  },
  "& .MuiFilledInput-root": {
    padding: 0,
  },
}));

export default function CustomInputLari({
  placeholderText,
  onClear,
  showPasswordIcon = false,
  type = "text",
  variant = "filled",
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
      label={placeholderText} 
      type={inputType}
      variant={variant}
      value={props.value}
      onChange={props.onChange}
      InputProps={{
        endAdornment: (
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
        ),
      }}
      {...props}
    />
  );
}
