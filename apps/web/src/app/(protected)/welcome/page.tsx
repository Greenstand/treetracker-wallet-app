"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Welcome from "@/components/Welcome";

export default function Page() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/home");
  };

  return <Welcome onContinue={handleContinue} />;
}
