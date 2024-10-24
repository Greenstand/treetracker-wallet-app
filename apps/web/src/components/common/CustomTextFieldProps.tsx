import React, { useState } from "react";
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
  handleChange?: any;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  type = "text",
  name,
  helperText,
  required = false,
  placeholder,
  handleChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordType = type === "password";

  return (
    <FormControl
      sx={{ width: "100%", my: 2 }}
      required={required}
      variant="filled">
      <InputLabel required={false}>{label}</InputLabel>
      <FilledInput
        type={isPasswordType && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        endAdornment={
          isPasswordType && (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {helperText && (
        <FormHelperText sx={{ fontSize: "12px", color: "red" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomTextField;
