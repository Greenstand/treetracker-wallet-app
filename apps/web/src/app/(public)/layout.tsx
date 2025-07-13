"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container maxWidth="sm">{children}</Container>;
}
