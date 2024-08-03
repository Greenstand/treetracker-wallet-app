"use client";
import React, { useState } from "react";
import { Box, Typography, FormControl, FormGroup } from "@mui/material";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomLink from "./CustomLink";

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

  const isFormValid = () => {
    return email !== "" && password !== "";
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        padding: "16px",
        width: "100%",
        maxWidth: "400",
      }}
    >
      {variant === "login" && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 7,
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "32.02px",
              color: "#222629DE",
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
          <FormControl fullWidth sx={{ mb: 6.5 }}>
            <CustomInput
              placeholderText="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClear={() => setEmail("")}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6.5 }}>
            <CustomInput
              placeholderText="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordIcon
            />
          </FormControl>

          <CustomButton
            variantType="primary"
            type="submit"
            fullWidth
            disabled={!isFormValid()}
          >
            {variant === "login" ? "LOG IN" : "SIGN UP"}
          </CustomButton>

          {variant === "login" && (
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                marginTop: "8px",
                justifyContent: "center",
              }}
            >
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

          <Box
            sx={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              marginTop: "16px",
              justifyContent: "center",
            }}
          >
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
