"use client";

import { Container, Box, Typography } from "@mui/material";

import React from "react";

export default function Wrapper(props: any) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
      {props.children}
    </Container>
  );
}
