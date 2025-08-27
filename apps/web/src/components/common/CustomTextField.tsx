"use client";

import React, { useState, ChangeEvent, memo } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface CustomTextFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
  autoFocus?: boolean;
  error?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const CustomTextField: React.FC<CustomTextFieldProps> = memo(props => {
  const {
    label,
    type = "text",
    name,
    helperText,
    required = false,
    placeholder,
    onChange,
    value,
    testId,
    autoFocus = false,
    error = false,
    inputProps,
    inputRef,
    onBlur,
    onKeyDown,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const inputId = `ctf-${name}`;
  const helperId = helperText?.trim() ? `${inputId}-helper` : undefined;

  const autoComplete =
    type === "email"
      ? "email"
      : type === "password"
        ? "current-password"
        : "on";

  return (
    <FormControl sx={{ width: 1, my: 2 }} variant="filled" error={!!error}>
      <InputLabel htmlFor={inputId}>{label}</InputLabel>
      <FilledInput
        id={inputId}
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        aria-describedby={helperId}
        endAdornment={
          isPassword && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(s => !s)}
                onMouseDown={e => e.preventDefault()}
                edge="end"
                data-test="toggle-password-visibility"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        data-test={testId}
        inputProps={inputProps}
        inputRef={inputRef}
      />
      {helperText?.trim() && (
        <FormHelperText
          sx={{ fontSize: 12, color: "red" }}
          id={helperId}
          data-test="error-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
