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
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  useGetTokens,
  useGetWallets,
  useUpdateWallet,
  Wallet,
  WalletProfileUpdate,
} from "@treetracker/wallet";
import WalletProfileDrawer from "@/components/WalletProfileDrawer";
import { toPlainText } from "@/utils/plainText";

function WalletDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const name = params?.get("name") ?? "";

  const { tokens, isTokensLoading, error } = useGetTokens(name);
  const { wallets, reload } = useGetWallets();
  const { updateWallet } = useUpdateWallet();

  const [editOpen, setEditOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  // Resolve this wallet's id (needed for PATCH) by matching the name.
  const wallet = useMemo(
    () => (wallets as Wallet[]).find((w) => w.name === name),
    [wallets, name],
  );

  // Loading state changes must not reset an open drawer's edits or errors.
  const initialProfile = useMemo(
    () => ({ display_name: wallet?.display_name, about: wallet?.about }),
    [wallet?.display_name, wallet?.about],
  );

  async function handleSave(fields: WalletProfileUpdate) {
    if (!wallet?.id) throw new Error("Wallet id not found");
    setSaved(false);
    await updateWallet(wallet.id, fields);
    if (!(await reload())) {
      throw new Error(
        "Wallet profile was saved, but could not be refreshed. Reopen this page to see your changes.",
      );
    }
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

      {wallet?.cover_url && (
        <Box
          sx={{
            mb: 2,
            width: "100%",
            height: 160,
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Box
            component="img"
            src={wallet.cover_url}
            alt={`${wallet.display_name || name} cover`}
            data-test="wallet-details-cover"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}

      {/* Basic wallet info */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar
            src={wallet?.logo_url}
            alt={name}
            data-test="wallet-details-logo"
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h6"
            fontWeight={600}
            data-test="wallet-details-name"
          >
            {wallet?.display_name || name}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Button
            variant="text"
            startIcon={<PaletteIcon />}
            onClick={() =>
              router.push(`/wallet/customize?name=${encodeURIComponent(name)}`)
            }
            disabled={!wallet?.id}
            sx={{ color: "green" }}
            data-test="wallet-customize-open"
          >
            Customize
          </Button>
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
      </Stack>
      {wallet?.about && (
        <Typography
          variant="body2"
          color="text.secondary"
          data-test="wallet-details-about"
        >
          {toPlainText(wallet.about)}
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
        initial={initialProfile}
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
