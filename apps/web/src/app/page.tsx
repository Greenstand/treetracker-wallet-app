"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <LoadingSpinner />;
}
