// components/ProtectedRoute.tsx
"use client";

import { useSession } from "core";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { isAuth } = useSession("login");
  const isAuth = localStorage.getItem("isAuth");
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  return <>{children}</>;
}
