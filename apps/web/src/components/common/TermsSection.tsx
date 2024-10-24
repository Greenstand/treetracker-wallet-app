"use client";

import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import NextLink from "next/link";

const TermsSection = () => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        gap: "0.3rem",
        display: "flex",
        flexWrap: "wrap",
      }}>
      <Typography>By continuing, I agree to Greenstand's</Typography>
      <Link
        href="#"
        component={NextLink}
        sx={{ color: "rgb(97, 137, 47)", textDecoration: "none" }}>
        Privacy Policy
      </Link>
      <Typography>and</Typography>
      <Link
        href="#"
        component={NextLink}
        sx={{ color: "rgb(97, 137, 47)", textDecoration: "none" }}>
        Terms of Use
      </Link>
    </Box>
  );
};

export default TermsSection;
