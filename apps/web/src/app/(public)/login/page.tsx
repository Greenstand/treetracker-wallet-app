"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Email as EmailIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Box, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";

import Wrapper from "@/components/common/Wrapper";
import Logo from "@/components/common/Logo";
import CenteredColumnBox from "@/components/common/CenteredColumnBox";
import CustomHeadingTitle from "@/components/common/CustomHeadingTitle";
import CustomTextField from "@/components/common/CustomTextField";
import CustomSubmitButton from "@/components/common/CustomSubmitButton";
import SocialButtons from "@/components/common/SocialButtons";
import TermsSection from "@/components/common/TermsSection";

import { loginAtom, tokenAtom } from "core";

const Login = () => {
  const router = useRouter();
  const loginUser = useSetAtom(loginAtom);
  const setToken = useSetAtom(tokenAtom);

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await loginUser(formState);

      if (response?.access_token) {
        setToken(response.access_token);
        router.push("/");
        return;
      }

      if (response?.fieldErrors && typeof response.fieldErrors === "object") {
        setFieldErrors(response.fieldErrors);
        return;
      }

      if (response?.message) {
        setFieldErrors({ general: response.message });
        return;
      }

      setFieldErrors({ general: "Login failed. Please try again." });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setFieldErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Wrapper>
      <CenteredColumnBox>
        <Logo />
        <CustomHeadingTitle title="Log in" />

        <form onSubmit={handleSubmit}>
          <CustomTextField
            label="Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            type="text"
            required
            helperText={fieldErrors.username}
            testId="login-username"
          />

          <CustomTextField
            label="Password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            type="password"
            required
            helperText={fieldErrors.password}
            testId="login-password"
          />

          {fieldErrors.general && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1 }}
              data-test="login-error">
              {fieldErrors.general}
            </Typography>
          )}

          <CustomSubmitButton
            text="Log In"
            isDisabled={isSubmitting}
            testId="login-submit-button"
          />
        </form>

        <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
          <Typography variant="body2">Or</Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}>
          <SocialButtons text="Login With Gmail" icon={<EmailIcon />} />
          <SocialButtons text="Login With Facebook" icon={<FacebookIcon />} />
          <SocialButtons text="Login With GitHub" icon={<GitHubIcon />} />

          <Box sx={{ display: "flex", gap: "0.3rem" }}>
            <Typography>Don't have an account?</Typography>
            <Link href="/signup" component={NextLink} data-test="signup-link">
              Sign Up
            </Link>
          </Box>

          <TermsSection />
        </Box>
      </CenteredColumnBox>
    </Wrapper>
  );
};

export default Login;
