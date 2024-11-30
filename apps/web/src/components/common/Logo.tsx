"use client";

import { Box } from "@mui/material";

export default function Logo(props: any) {
  return (
    <Box
      sx={{
        marginX: "auto",
        maxWidth: 250,
        width: "50dvw",
        paddingTop: 5,
        paddingBottom: 2,
      }}>
      <img
        style={{ width: "100%", height: "100%" }}
        src="/assets/images/TreeTraderLogo.svg"
      />
    </Box>
  );
}
