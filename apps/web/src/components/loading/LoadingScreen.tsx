"use client";

import { Box, Typography } from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({
  message = "Processing, please wait...",
}: LoadingScreenProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <CircularProgressWithLabel />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
