"use client";
import { Typography } from "@mui/material";
import React from "react";

export default function CustomHeadingTitle(props: { title: string }) {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {props.title}
    </Typography>
  );
}
