"use client";

import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type OrTextProps = {
  text?: string;
  sx?: SxProps<Theme>;
  "data-test"?: string;
};

const OrText = ({ text = "or", sx, "data-test": dataTest }: OrTextProps) => {
  return (
    <Box
      sx={{
        my: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      data-test={dataTest || "or-text"}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom={false}>
        {text}
      </Typography>
    </Box>
  );
};

export default OrText;
