"use client";

import { Button, MenuItem, TextField } from "@mui/material";
import type { Wallet } from "@treetracker/wallet";

export function ClaimWalletPicker({
  wallets,
  selectedWallet,
  onWalletChange,
  onConfirm,
}: {
  wallets: Wallet[];
  selectedWallet: string;
  onWalletChange: (walletName: string) => void;
  onConfirm: () => void;
}) {
  const walletToClaim = selectedWallet || wallets[0]?.name || "";

  return (
    <>
      <TextField
        select
        fullWidth
        label="Receive tokens in"
        value={walletToClaim}
        onChange={(event) => onWalletChange(event.target.value)}
        sx={{ mt: 3, textAlign: "left" }}
        data-test="claim-wallet-select"
      >
        {wallets.map((wallet) => (
          <MenuItem key={wallet.name} value={wallet.name}>
            {wallet.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        disabled={!walletToClaim}
        onClick={onConfirm}
        sx={{ mt: 3 }}
        data-test="claim-confirm"
      >
        Claim tokens
      </Button>
    </>
  );
}
