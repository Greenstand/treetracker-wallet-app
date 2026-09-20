"use client";

import * as React from "react";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import { CustomBalanceCard } from "@/components/common/CustomBalanceCard";

export function TokenBalance({
  tokenCount,
  pendingCount = 0,
  isLoading,
}: {
  tokenCount: number;
  pendingCount?: number;
  isLoading?: boolean;
}) {
  return (
    <CustomBalanceCard
      icon={<TollOutlinedIcon sx={{ color: "green" }} />}
      label={pendingCount > 0 ? `Tokens (${pendingCount} pending)` : "Tokens"}
      value={tokenCount}
      isLoading={isLoading}
    />
  );
}
