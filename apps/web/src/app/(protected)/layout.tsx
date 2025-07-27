"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { tokenAtom } from "core";
import Header from "@/components/header/Header";
import BottomNavigationBar from "@/components/navigation/BottomNavigatorBar";

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

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea === sessionStorage) {
        if (e.key === "token" && e.newValue === null) {
          setToken(null);
          router.replace("/login");
        } else if (e.key === null) {
          setToken(null);
          router.replace("/login");
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router, setToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = sessionStorage.getItem("token");
      if (token && !currentToken) {
        setToken(null);
        router.replace("/login");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [token, router, setToken]);

  if (!mounted || !checked || !token) return <LoadingSpinner />;

  return (
    <>
      <Header />
      {children}
      <BottomNavigationBar />
    </>
  );
}
