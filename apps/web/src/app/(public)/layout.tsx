"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Container } from "@mui/material";
import { tokenAtom } from "core";
import { useAtomValue } from "jotai";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAtomValue(tokenAtom);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (token && pathname !== "/home") {
      router.replace("/home");
    } else if (!token && !["/login", "/signup"].includes(pathname ?? "")) {
      router.replace("/login");
    }
  }, [token, pathname, router]);

  return <Container maxWidth="sm">{children}</Container>;
};

export default PublicLayout;
