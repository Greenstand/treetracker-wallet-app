"use client";

import * as React from "react";
import { Container, Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Home Page
          </Typography>
        </Box>
      </Container>
    </>
  );
}
