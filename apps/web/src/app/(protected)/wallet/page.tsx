"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import WalletItem from "@/components/WalletItem";
import GenericDrawer from "@/components/GenericDrawer";
import WalletCreateDrawer from "@/components/WalletCreateDrawer";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { useCreateWallet, useGetWallets, Wallet } from "@treetracker/wallet";
import { claimPendingToken } from "@/utils/claimPendingToken";

type Notification = { severity: "success" | "error"; message: string };

// The API enforces no wallet count, so this is the only place the limit holds.
// Advertised by the Good-to-know drawer below, which reads the same constant.
const MAX_WALLETS = 2;

export default function WalletPage() {
  const router = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const { wallets: serverWallets, isWalletLoading, error } = useGetWallets();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const { createWallet } = useCreateWallet();
  const authToken = useAtomValue(tokenAtom);

  useEffect(() => {
    if (serverWallets.length > 0) {
      setWallets(serverWallets);
    }
  }, [serverWallets]);

  const handleCreate = async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    // First wallet for this user? (empty list before this creation)
    const isFirstWallet = wallets.length === 0;

    const result = await createWallet({
      name,
      about: description, // ✅ Send to API
    });

    console.log(result);

    setWallets((prev) => [
      {
        name,
        created_at: new Date().toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        amount: 0,
      },
      ...prev,
    ]);

    if (isFirstWallet) {
      setNotification({
        severity: "success",
        message:
          "Thansk you for creating your wallet, we will gift you 1 token for your first wallet, please check your wallet details",
      });
    }

    // Redeem into the wallet just created, rather than the login wallet that
    // redeem defaults to. PendingClaimHandler covers users who already had
    // one; claimPendingToken takes the link out of storage before it calls
    // the API, so only one of the two can ever redeem it.
    if (authToken) {
      const outcome = await claimPendingToken(authToken, name);
      if (outcome) setNotification(outcome);
    }
  };

  const atWalletLimit = wallets.length >= MAX_WALLETS;

  // if (isWalletLoading) return <div>Loading wallets...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          data-test="wallet-create-open"
          variant="text"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateOpen(true)}
          disabled={atWalletLimit}
          sx={{ color: "green", fontSize: "1rem", fontWeight: 500 }}
        >
          CREATE WALLET
        </Button>
        <IconButton
          aria-label="More wallet information"
          onClick={() => setIsInfoOpen(true)}
          sx={{ color: "#2226298F" }}
        >
          <InfoIcon sx={{ width: "20px" }} />
        </IconButton>
      </Box>

      {atWalletLimit && (
        <Typography
          variant="caption"
          color="text.secondary"
          data-test="wallet-limit-reached"
        >
          You have reached the limit of {MAX_WALLETS} wallets.
        </Typography>
      )}

      <Box sx={{ height: 10 }} />

      <Typography variant="h6" fontWeight={500}>
        Your Wallets
      </Typography>

      <Stack spacing={0.5} data-test="wallet-list">
        {wallets.map((wallet, idx) => (
          <div
            key={idx}
            data-test={`wallet-list-item-${idx}`}
            style={{ cursor: "pointer" }}
            onClick={() =>
              router.push(
                `/wallet/details?name=${encodeURIComponent(wallet.name)}`,
              )
            }
          >
            <WalletItem {...(wallet as Wallet)} />
          </div>
        ))}
      </Stack>

      <GenericDrawer
        open={isInfoOpen}
        title="Good-to-know"
        onClose={() => setIsInfoOpen(false)}
      >
        <Typography variant="body1" color="textPrimary">
          You can have up to {MAX_WALLETS} wallets.
        </Typography>
      </GenericDrawer>

      <WalletCreateDrawer
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        existingNames={wallets.map((w) => w.name)}
      />

      <Snackbar
        open={Boolean(notification)}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={notification?.severity ?? "success"}
          onClose={() => setNotification(null)}
          data-test="wallet-create-notification"
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
