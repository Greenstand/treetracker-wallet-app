"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetTokens,
  useGetWallets,
  useUpdateWallet,
  Wallet,
  WalletProfileUpdate,
} from "@treetracker/wallet";
import WalletProfileDrawer from "@/components/WalletProfileDrawer";

function WalletDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const name = params?.get("name") ?? "";

  const { tokens, isTokensLoading, error } = useGetTokens(name);
  const { wallets } = useGetWallets();
  const { updateWallet } = useUpdateWallet();

  const [editOpen, setEditOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  // Resolve this wallet's id (needed for PATCH) by matching the name.
  const wallet = useMemo(
    () => (wallets as Wallet[]).find((w) => w.name === name),
    [wallets, name],
  );

  async function handleSave(fields: WalletProfileUpdate) {
    if (!wallet?.id) throw new Error("Wallet id not found");
    await updateWallet(wallet.id, fields);
    setSaved(true);
  }

  return (
    <Box sx={{ p: 2 }} data-test="wallet-details-page">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/wallet")}
        sx={{ color: "green" }}
        data-test="wallet-details-back"
      >
        Back
      </Button>

      {/* Basic wallet info */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          fontWeight={600}
          data-test="wallet-details-name"
        >
          {wallet?.display_name || name}
        </Typography>
        <Button
          variant="text"
          startIcon={<EditIcon />}
          onClick={() => setEditOpen(true)}
          disabled={!wallet?.id}
          sx={{ color: "green" }}
          data-test="wallet-edit-open"
        >
          Edit
        </Button>
      </Stack>
      {wallet?.about && (
        <Typography
          variant="body2"
          color="text.secondary"
          data-test="wallet-details-about"
        >
          {wallet.about}
        </Typography>
      )}
      <Typography
        variant="body2"
        color="text.secondary"
        data-test="wallet-details-balance"
      >
        Token balance: {tokens.length}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight={500}>
        Tokens in wallet
      </Typography>

      {isTokensLoading && <Typography variant="body2">Loading…</Typography>}
      {error && (
        <Typography variant="body2" color="error" data-test="token-list-error">
          {error}
        </Typography>
      )}

      <Stack spacing={0.5} sx={{ mt: 1 }} data-test="token-list">
        {tokens.map((t: { id: string }) => (
          <Paper
            key={t.id}
            sx={{
              p: 2,
              cursor: "pointer",
              "&:hover": { bgcolor: "grey.50" },
            }}
            data-test={`token-item-${t.id}`}
            onClick={() =>
              router.push(
                `/token/details?id=${t.id}&wallet=${encodeURIComponent(name)}`,
              )
            }
          >
            <Typography variant="body2">{t.id}</Typography>
          </Paper>
        ))}
      </Stack>

      <WalletProfileDrawer
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={{
          display_name: wallet?.display_name,
          about: wallet?.about,
        }}
        onSave={handleSave}
      />

      <Snackbar
        open={saved}
        autoHideDuration={4000}
        onClose={() => setSaved(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" data-test="wallet-edit-saved">
          Wallet profile updated.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function WalletDetailsPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 2 }}>Loading…</Box>}>
      <WalletDetails />
    </Suspense>
  );
}
