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

import { registerAtom } from "core";

const INITIAL_FORM = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const router = useRouter();
  const triggerRegister = useSetAtom(registerAtom);

  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  type SuccessMessage = { success: boolean; message: string };
  const [successMessage, setSuccessMessage] = useState<SuccessMessage | null>(
    null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      const response = await triggerRegister(form);

      if (response?.success) {
        setSuccessMessage({
          success: response.success,
          message: response.message,
        });
        router.push("/login");
        return;
      }

      if (response?.fieldErrors && typeof response.fieldErrors === "object") {
        setFieldErrors(response.fieldErrors);
        return;
      }

      if (response?.error && typeof response.error === "string") {
        console.error("Signup error:", response.error);
        setFieldErrors({ general: response.error });
        return;
      }

      setFieldErrors({ general: "Sign up failed. Please try again." });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setFieldErrors({ general: message });
      console.error("Signup error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(successMessage, "successMessage");
  return (
    <Wrapper>
      <CenteredColumnBox>
        <Logo />
        <CustomHeadingTitle title="Sign Up" />
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          data-test="signup-form">
          <CustomTextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            required
            autoFocus
            helperText={fieldErrors.username}
            testId="signup-username"
          />
          <CustomTextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            helperText={fieldErrors.email}
            testId="signup-email"
          />
          <CustomTextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            helperText={fieldErrors.password}
            testId="signup-password"
          />

          {fieldErrors.general && !successMessage?.success && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1 }}
              data-test="signup-error">
              {fieldErrors.general}
            </Typography>
          )}
          {successMessage?.success && (
            <Typography
              variant="body2"
              color="success.main"
              sx={{ mt: 1 }}
              data-test="signup-success">
              {successMessage.message}
            </Typography>
          )}
          <CustomSubmitButton
            text="Sign Up"
            isDisabled={isSubmitting}
            testId="signup-submit-button"
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
          <SocialButtons text="Sign Up With Gmail" icon={<EmailIcon />} />
          <SocialButtons text="Sign Up With Facebook" icon={<FacebookIcon />} />
          <SocialButtons text="Sign Up With GitHub" icon={<GitHubIcon />} />

          <Box sx={{ display: "flex", gap: "0.3rem" }}>
            <Typography>Have an Account?</Typography>
            <Link href="/login" component={NextLink} data-test="login-link">
              Log in
            </Link>
          </Box>
          <TermsSection />
        </Box>
      </CenteredColumnBox>
    </Wrapper>
  );
};

export default SignUp;
