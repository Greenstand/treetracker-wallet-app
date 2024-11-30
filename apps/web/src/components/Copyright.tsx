"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

interface Props {}

const Copyright: React.FunctionComponent<Props> = function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{" "}
      <h1> {new Date().getFullYear()}.</h1>
    </Typography>
  );
};

export default Copyright;
