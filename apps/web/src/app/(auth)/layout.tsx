import * as React from "react";
import { Container } from "@mui/material";

export default function RootLayout(props: { children: React.ReactNode }) {
  return <Container maxWidth="sm">{props.children}</Container>;
}
