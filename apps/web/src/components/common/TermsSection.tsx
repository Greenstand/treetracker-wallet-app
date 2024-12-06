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
      <Typography variant="sub">
        By continuing, I agree to Greenstand's
      </Typography>
      <Link href="#" component={NextLink} variant="sub">
        Privacy Policy
      </Link>
      <Typography variant="sub">and</Typography>
      <Link href="#" component={NextLink} variant="sub">
        Terms of Use
      </Link>
    </Box>
  );
};

export default TermsSection;
