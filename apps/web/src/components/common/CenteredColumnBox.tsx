"use client";

import { Box } from "@mui/material";

export default function CenteredColumnBox(props: any) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="center">
      {props.children}
    </Box>
  );
}
