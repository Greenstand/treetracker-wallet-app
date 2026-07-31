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
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import WalletItem from "@/components/WalletItem";
import GenericDrawer from "@/components/GenericDrawer";
import WalletCreateDrawer from "@/components/WalletCreateDrawer";
import {
  useCreateWallet,
  useGetWallets,
  redeemActionToken,
  Wallet,
} from "@treetracker/wallet";
import {
  readPendingActionToken,
  clearPendingActionToken,
} from "@/utils/actionToken";

export default function WalletPage() {
  const router = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const { wallets: serverWallets, isWalletLoading, error } = useGetWallets();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const normalize = (s: string) => s.trim().toLowerCase();

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
    const isDup = wallets.some((w) => normalize(w.name) === normalize(name));
    if (isDup) return;

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
      setNotification(
        "Thansk you for creating your wallet, we will gift you 1 token for your first wallet, please check your wallet details",
      );
    }

    // If the user arrived via a shared token link, redeem it into this wallet.
    const pending = readPendingActionToken();
    if (pending && authToken) {
      try {
        await redeemActionToken(authToken, pending);
        clearPendingActionToken();
        setNotification(
          "Your shared token has been claimed and added to your wallet.",
        );
      } catch (e) {
        setNotification(
          e instanceof Error ? e.message : "Could not claim your shared token.",
        );
      }
    }
  };

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
          You can have up to 2 wallets.
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
          severity="success"
          onClose={() => setNotification(null)}
          data-test="wallet-create-notification"
        >
          {notification}
        </Alert>
      </Snackbar>
    </Box>
  );
}
