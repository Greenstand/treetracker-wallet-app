"use client";

import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const CircularProgressWithLabel = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 100 : prevProgress + 10,
      );
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={progress}
        size={32}
        sx={{ color: "#61892F" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Typography
          variant="caption"
          component="div"
          sx={{ fontSize: "12px", color: "#222629" }}>
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
