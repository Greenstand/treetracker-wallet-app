"use client";

import React from "react";
import { useRouter } from "next/navigation";
import WelcomePage from "@/components/WelcomePage";

export default function Welcome() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/home");
  };

  return <WelcomePage onContinue={handleContinue} />;
}
