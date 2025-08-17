import React, { useState, ChangeEvent } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface CustomTextFieldProps {
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
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  type = "text",
  name,
  helperText,
  required = false,
  placeholder,
  onChange,
  value,
  testId,
  error = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <FormControl sx={{ width: 1, my: 2 }} variant="filled" error={error}>
      <InputLabel required={required}>{label}</InputLabel>
      <FilledInput
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        endAdornment={
          isPassword && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(show => !show)}
                edge="end"
                data-test="toggle-password-visibility"
                tabIndex={-1}
                aria-label="toggle password visibility">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        data-test={testId}
      />
      {helperText?.trim() && (
        <FormHelperText data-test="error-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomTextField;
