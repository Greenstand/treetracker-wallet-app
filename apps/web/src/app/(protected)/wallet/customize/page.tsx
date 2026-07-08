"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  useGetWallets,
  useUpdateWallet,
  Wallet,
  WalletProfileUpdate,
} from "@treetracker/wallet";
import RichTextEditor from "@/components/RichTextEditor";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function CustomizeWallet() {
  const params = useSearchParams();
  const router = useRouter();
  const name = params?.get("name") ?? "";

  const { wallets } = useGetWallets();
  const { updateWallet } = useUpdateWallet();

  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Resolve wallet by name
  const wallet = React.useMemo(
    () => (wallets as Wallet[]).find((w) => w.name === name),
    [wallets, name]
  );

  useEffect(() => {
    if (wallet) {
      setDisplayName(wallet.display_name || "");
      setAbout(wallet.about || "");
      if (wallet.logo_url) {
        setLogoPreview(wallet.logo_url);
      }
      if ((wallet as any).cover_image_url) {
        setHeroPreview((wallet as any).cover_image_url);
      }
    }
  }, [wallet]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`Logo file must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Logo must be an image file");
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`Hero image file must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Hero image must be an image file");
        return;
      }
      setHeroFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setHeroPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!wallet?.id) {
      setError("Wallet not found");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Build FormData for multipart upload
      const formData = new FormData();

      if (displayName.trim()) {
        formData.append("display_name", displayName.trim());
      }
      if (about.trim()) {
        formData.append("about", about.trim());
      }
      if (logoFile) {
        formData.append("logo_image", logoFile);
      }
      if (heroFile) {
        formData.append("cover_image", heroFile);
      }

      // Call the update endpoint
      await updateWallet(wallet.id, formData as any);
      setSuccess(true);
      setLogoFile(null);
      setHeroFile(null);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/wallet/details?name=${encodeURIComponent(name)}`);
      }, 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update wallet");
    } finally {
      setSaving(false);
    }
  };

  if (!wallet) {
    return (
      <Box sx={{ p: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/wallet")}
          sx={{ color: "green", mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="body1">Loading wallet...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto", pb: 4 }} data-test="customize-wallet-page">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push(`/wallet/details?name=${encodeURIComponent(name)}`)}
        sx={{ color: "green", mb: 3 }}
        data-test="customize-wallet-back"
      >
        Back
      </Button>

      <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
        Customize Wallet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {name}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} data-test="customize-error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} data-test="customize-success">
          Wallet updated successfully! Redirecting...
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Display Name */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Display Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            data-test="customize-display-name"
            disabled={saving}
          />
        </Box>

        {/* About Section */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            About the Wallet
          </Typography>
          <RichTextEditor
            value={about}
            onChange={setAbout}
            disabled={saving}
            data-test="customize-about"
          />
        </Box>

        {/* Logo Upload */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Logo
          </Typography>
          {logoPreview && (
            <Box
              sx={{
                mb: 2,
                width: 150,
                height: 150,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logoPreview}
                alt="Logo preview"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            component="label"
            disabled={saving}
            data-test="customize-logo-upload"
          >
            UPLOAD
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleLogoChange}
            />
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Max size: 5MB
          </Typography>
        </Box>

        {/* Hero Image Upload */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Hero image (Recommended Resolution 840 x 360)
          </Typography>
          {heroPreview && (
            <Box
              sx={{
                mb: 2,
                width: "100%",
                height: 200,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src={heroPreview}
                alt="Hero preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            component="label"
            disabled={saving}
            data-test="customize-hero-upload"
          >
            UPLOAD
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleHeroChange}
            />
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Max size: 5MB
          </Typography>
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          disabled={saving || !wallet?.id}
          sx={{ mt: 3 }}
          data-test="customize-save"
        >
          {saving ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Saving...
            </>
          ) : (
            "SAVE"
          )}
        </Button>
      </Stack>
    </Box>
  );
}

export default function CustomizeWalletPage() {
  return <CustomizeWallet />;
}
