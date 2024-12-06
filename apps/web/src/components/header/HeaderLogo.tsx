"use client";
import React from "react";
import Image from "next/image";

export default function HeaderLogo() {
  return (
    <Image
      src="/assets/images/greenstand-logo.svg"
      alt="Tree Trader Logo"
      width={50}
      height={50}
      style={{ objectFit: "contain" }}
    />
  );
}
