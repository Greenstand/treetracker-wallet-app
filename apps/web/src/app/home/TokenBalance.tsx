"use client";

import * as React from "react";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import { CustomBalanceCard } from "@/components/common/CustomBalanceCard";

export function TokenBalance({ tokenCount }: { tokenCount: number }) {
  return (
    <CustomBalanceCard
      icon={<TollOutlinedIcon sx={{ color: "green" }} />}
      label="Tokens"
      value={tokenCount}
    />
  );
}
