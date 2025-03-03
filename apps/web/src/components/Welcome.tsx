"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

interface WelcomeProps {
  onContinue?: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  const theme = useTheme();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: "white",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          py: 4,
        }}>
        <Typography variant="h5">Account created!</Typography>

        <CheckCircle
          sx={{
            fontSize: 40,
            color: theme.palette.header.main,
            my: 0,
          }}
        />

        <Typography variant="body1" sx={{ mb: 1, width: "95%" }}>
          Welcome and thank you for joining our reforestation mission and
          becoming part of our global community dedicated to positive
          environmental impact.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, width: "95%" }}>
          Upon creating your account, you will automatically receive your
          wallet, which you can rename later.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleContinue}
          sx={{
            width: "95%",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}>
          Continue
        </Button>
      </Box>
    </Container>
  );
}
