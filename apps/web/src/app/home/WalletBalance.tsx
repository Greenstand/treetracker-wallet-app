"use client";

import * as React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { CustomBalanceCard } from "@/components/common/CustomBalanceCard";

export function WalletBalance({ walletAmount }: { walletAmount: number }) {
  return (
    <CustomBalanceCard
      icon={<AccountBalanceWalletIcon />}
      label="Wallet"
      value={walletAmount}
    />
  );
}
