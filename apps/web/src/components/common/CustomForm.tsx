"use client";
import React, { useState } from "react";
import { Box, Typography, FormGroup } from "@mui/material";
import CustomButton from "./CustomButton";
import CustomLink from "./CustomLink";
import CustomInput from "./CustomInput";

interface CustomFormProps {
  variant: "login" | "signup";
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function CustomForm({
  variant,
  onSubmit,
  children,
}: CustomFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email !== "" && password !== "";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const formContainerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    padding: 4,
    width: "100%",
    maxWidth: 450,
  };

  const buttonContainerStyles = {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    marginTop: 2,
    justifyContent: "center",
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={formContainerStyles}
    >
      {variant === "login" && (
        <Box
          sx={{
            width: "100%",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 7,
              fontSize: (theme) => theme.typography.h5.fontSize,
              fontWeight: (theme) => theme.typography.h5.fontWeight,
              lineHeight: (theme) => theme.typography.h5.lineHeight,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Log in
          </Typography>
        </Box>
      )}

      {children ? (
        children
      ) : (
        <FormGroup sx={{ width: "100%", alignItems: "center" }}>
          {/* Remove FormControl wrappers */}
          <CustomInput
            placeholderText="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onClear={() => setEmail("")}
            aria-label="email input"
            variant="filled"
            sx={{ mb: 6.5, width: "100%" }}
          />

          <CustomInput
            placeholderText="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            showPasswordIcon
            aria-label="password input"
            variant="filled"
            sx={{ mb: 6.5, width: "100%" }}
          />

          <CustomButton
            variantType="primary"
            type="submit"
            fullWidth
            disabled={!isFormValid}
            sx={{ mb: 2, width: "100%" }}
          >
            {variant === "login" ? "LOG IN" : "SIGN UP"}
          </CustomButton>

          {variant === "login" && (
            <Box sx={buttonContainerStyles}>
              <Typography variant="body2">Forgot password?</Typography>
              <CustomLink href="/reset">Reset</CustomLink>
            </Box>
          )}

          <Typography
            sx={{ margin: "12px 0", textAlign: "center" }}
            variant="body2"
          >
            or
          </Typography>

          <CustomButton variantType="social" iconSrc="/icons/gmail.svg" fullWidth>
            {variant === "login" ? "LOG IN WITH GMAIL" : "SIGN UP WITH GMAIL"}
          </CustomButton>

          <CustomButton variantType="social" iconSrc="/icons/facebook.svg" fullWidth>
            {variant === "login" ? "LOG IN WITH FACEBOOK" : "SIGN UP WITH FACEBOOK"}
          </CustomButton>

          <CustomButton variantType="social" iconSrc="/icons/github.svg" fullWidth>
            {variant === "login" ? "LOG IN WITH GITHUB" : "SIGN UP WITH GITHUB"}
          </CustomButton>

          <Box sx={buttonContainerStyles}>
            <Typography variant="body2">
              {variant === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
            </Typography>
            <CustomLink href={variant === "login" ? "/signup" : "/login"}>
              {variant === "login" ? "Sign up" : "Log in"}
            </CustomLink>
          </Box>
        </FormGroup>
      )}
    </Box>
  );
}
