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
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "demo",
    password: "demodemon",
  });
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error_description || "Login failed");
        return;
      }

      localStorage.setItem("isAuth", "true");

      localStorage.setItem("token", data.access_token);
      //@ts-ignore

      router.push("/home");
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const isFormValid = formData.username !== "" && formData.password !== "";
    setIsButtonDisabled(!isFormValid);
  }, [formData]);

  return (
    <Wrapper>
      <CenteredColumnBox>
        <Logo />
        <CustomHeadingTitle title="Log in" />
        <form onSubmit={handleSubmit}>
          <CustomTextField
            label="Username"
            name="username"
            value={formData.username}
            handleChange={handleChange}
            type="text"
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
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
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
