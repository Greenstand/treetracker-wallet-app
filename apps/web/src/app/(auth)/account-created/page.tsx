"use client";

import { Box, Button, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AccountCreatedConfirmation() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/home"); // Update as needed
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        pt: 6,
        textAlign: "center",
        backgroundColor: "#ffffff",
      }}>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center">
        {/* Title */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#212121",
            mb: 1.5,
          }}>
          Account created!
        </Typography>

        {/* Image */}
        <Box
          sx={{
            width: 240,
            height: 240,
            mb: 4,
            position: "relative",
          }}>
          <Image
            src="/assets/images/account-created.png"
            alt="Account created"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Paragraph */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#5f6368",
            maxWidth: "280px",
            lineHeight: "21px",
            mb: 8,
          }}>
          Welcome! Thank you for joining our mission to reforest the planet and
          contribute to a healthier environment.
        </Typography>

        {/* Button */}
        <Button
          onClick={handleContinue}
          variant="contained"
          sx={{
            minWidth: "240px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "6px",
            paddingY: "10px",
            textTransform: "uppercase",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              backgroundColor: "#43A047",
              boxShadow: "none",
            },
          }}>
          Continue
        </Button>
      </Box>
    </Container>
  );
}
