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

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State for the state of the button

  // Function to handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // The process of submitting the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sending to backend will come here (API integration)
    console.log("Form Data:", formData);
  };

  // Validate email and password on each form data change
  useEffect(() => {
    // Button activation logic
    const isFormValid: boolean = formData.password !== ""; // TypeScript is instructed that this is a boolean

    setIsButtonDisabled(!isFormValid); // If the form is not valid the button becomes disabled
  }, [formData]);
  return (
    <Wrapper>
      <CenteredColumnBox>
        <Logo />
        <CustomHeadingTitle title="Log in" />
        <form onSubmit={handleSubmit}>
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
          <CustomSubmitButton text="Log In" isDisabled={isButtonDisabled} />
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
            text="Login With Gmail"
            type="submit"
            icon={<EmailIcon />}
          />
          <SocialButtons
            text="Login With Facebook"
            type="submit"
            icon={<FacebookIcon />}
          />
          <SocialButtons
            text="Login With Github"
            type="submit"
            icon={<GitHubIcon />}
          />
          <Box sx={{ display: "flex", gap: "0.3rem" }}>
            <Typography>Not have an Account?</Typography>
            <Link href="/signup" component={NextLink}>
              SignUp
            </Link>
          </Box>
          <TermsSection />
        </Box>
      </CenteredColumnBox>
    </Wrapper>
  );
}
