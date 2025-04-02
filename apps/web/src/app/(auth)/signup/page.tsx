"use client";

import React, { useEffect, useState } from "react";

import {
  Email as EmailIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

import Link from "@mui/material/Link";
import NextLink from "next/link";
import Wrapper from "@/components/common/Wrapper";
import CustomHeadingTitle from "@/components/common/CustomHeadingTitle";
import CustomTextField from "@/components/common/CustomTextFieldProps";
import { Box, Typography } from "@mui/material";
import CustomSubmitButton from "@/components/common/CustomSubmitButton";
import SocialButtons from "@/components/common/SocialButtons";
import TermsSection from "@/components/common/TermsSection";
import CenteredColumnBox from "@/components/common/CenteredColumnBox";
import Logo from "@/components/common/Logo";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Data:", formData);
  };

  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError("Error: Email is incorrect");
    } else {
      setEmailError("");
    }

    if (formData.password && !validatePassword(formData.password)) {
      setPasswordError("Minimum length 8 characters");
    } else {
      setPasswordError("");
    }

    const isFormValid =
      formData.name !== "" &&
      emailError === "" &&
      passwordError === "" &&
      formData.password !== "" &&
      formData.confirmPassword !== "" &&
      formData.password === formData.confirmPassword;

    setIsButtonDisabled(!isFormValid);
  }, [formData, emailError, passwordError]);

  return (
    <Wrapper>
      <CenteredColumnBox>
        <Logo />
        <CustomHeadingTitle title="Sign Up" />
        <form onSubmit={handleSubmit}>
          <CustomTextField
            label="Name"
            name="name"
            value={formData.name}
            handleChange={handleChange}
            required
          />
          <CustomTextField
            label="Email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            type="email"
            required
          />
          <CustomTextField
            label="Password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
            type="password"
            required
          />
          <CustomTextField
            label="Confirm password"
            name="confirmpassword"
            type="password"
            value={formData.confirmPassword}
            handleChange={handleChange}
            required
          />
          <CustomSubmitButton text="Sign Up" isDisabled={isButtonDisabled} />
        </form>

        <Box
          sx={{
            my: 3,
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}>
          <Typography variant="body2">Or</Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}>
          <SocialButtons
            text="SignUp With Gmail"
            type="submit"
            icon={<EmailIcon />}
          />
          <SocialButtons
            text="SignUp With Facebook"
            type="submit"
            icon={<FacebookIcon />}
          />
          <SocialButtons
            text="SignUp With Github"
            type="submit"
            icon={<GitHubIcon />}
          />
          <Box sx={{ display: "flex", gap: "0.3rem" }}>
            <Typography>Have an Account?</Typography>
            <Link href="/login" component={NextLink}>
              Log in
            </Link>
          </Box>
          <TermsSection />
        </Box>
      </CenteredColumnBox>
    </Wrapper>
  );
}
