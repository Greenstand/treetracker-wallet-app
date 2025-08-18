'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "your email";

  const handleResend = () => {
    console.log("Resending link to:", email);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        px: 3,
        textAlign: "center",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="Back to login"
        onClick={() => router.push("/login")}
        sx={{ position: "absolute", left: 0, top: 0 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={4}>
        Check your email
      </Typography>
      <Typography variant="body2" mb={4}>
        Use the link we sent to <strong>{email}</strong> to set a new password.
        <br />
        Can’t see it? Try your spam folder or click below to resend it.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={() => router.push("/login")}
        sx={{
          backgroundColor: "#61892F",
          color: "#fff",
          mb: 2,
        }}
      >
        BACK TO LOGIN
      </Button>

      <Button
        fullWidth
        variant="outlined"
        onClick={handleResend}
        sx={{
          borderColor: "#61892F",
          color: "#61892F",
        }}
      >
        RESEND LINK
      </Button>
    </Box>
  );
}