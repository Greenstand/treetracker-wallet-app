"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import LoadingSpinner from "@/components/LoadingSpinner";
import { tokenAtom } from "core";
import { onLogout } from "@/auth/sessionChannel";
import Header from "@/components/header/Header";
import BottomNavigationBar from "@/components/navigation/BottomNavigatorBar";
import { HeaderProvider } from "@/context/HeaderContext";
import { SnackbarProvider } from "@/context/SnackbarContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useAtom(tokenAtom);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setChecked(true);
    }
  }, [mounted, token]);

  useEffect(() => {
    if (checked && !token) {
      router.replace("/login");
    }
  }, [checked, token, router]);

  useEffect(
    () =>
      onLogout(() => {
        setToken(null);
        router.replace("/login");
      }),
    [router, setToken],
  );

  if (!mounted || !checked || !token) return <LoadingSpinner />;

  return (
    <SnackbarProvider>
      <HeaderProvider>
        <Header />
        <Box sx={{ pb: "calc(56px + env(safe-area-inset-bottom))" }}>
          {children}
        </Box>
        <BottomNavigationBar />
      </HeaderProvider>
    </SnackbarProvider>
  );
}
