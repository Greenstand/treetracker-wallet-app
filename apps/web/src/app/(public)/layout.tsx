"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Container } from "@mui/material";
import { tokenAtom } from "core";
import { useAtom } from "jotai";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useAtom(tokenAtom);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (token && pathname !== "/home") {
      router.replace("/home");
    } else if (!token && !["/login", "/signup"].includes(pathname ?? "")) {
      router.replace("/login");
    }
  }, [token, pathname, router]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" && e.newValue === null) {
        setToken(null);
        router.replace("/login");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router, setToken]);

  return <Container maxWidth="sm">{children}</Container>;
};

export default PublicLayout;
