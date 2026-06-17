"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomTextField from "@/components/common/CustomTextField";
import { WalletProfileUpdate } from "@treetracker/wallet";

export interface WalletProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  initial?: WalletProfileUpdate;
  onSave: (fields: WalletProfileUpdate) => Promise<void>;
}

// Edit a wallet's profile: display_name, about, and web-map visibility.
// Submits via PATCH /wallets/:id (multipart, handled by useUpdateWallet).
const WalletProfileDrawer: React.FC<WalletProfileDrawerProps> = ({
  open,
  onClose,
  initial,
  onSave,
}) => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [addToWebMap, setAddToWebMap] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDisplayName(initial?.display_name ?? "");
      setAbout(initial?.about ?? "");
      setAddToWebMap(initial?.add_to_web_map ?? false);
      setError(null);
    }
  }, [open, initial]);

  // The API constrains display_name 2-30 and about 5-250; mirror so we don't 400.
  const displayNameValid =
    displayName.length === 0 ||
    (displayName.trim().length >= 2 && displayName.trim().length <= 30);
  const aboutValid =
    about.length === 0 ||
    (about.trim().length >= 5 && about.trim().length <= 250);
  const canSave = displayNameValid && aboutValid && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
      const fields: WalletProfileUpdate = { add_to_web_map: addToWebMap };
      if (displayName.trim()) fields.display_name = displayName.trim();
      if (about.trim()) fields.about = about.trim();
      await onSave(fields);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          pb: 2,
          maxWidth: 560,
          mx: "auto",
          width: "100%",
        },
      }}
    >
      <Box sx={{ p: 2.5, pb: 1.5, display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
          Edit wallet profile
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ p: 2.5 }}>
        <CustomTextField
          label="Display name"
          name="display_name"
          placeholder="Display name (2-30 chars)"
          value={displayName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDisplayName(e.target.value)
          }
          testId="profile-display-name"
          error={!displayNameValid}
          helperText={
            !displayNameValid ? "Must be 2-30 characters." : undefined
          }
        />

        <CustomTextField
          label="About"
          name="about"
          placeholder="About this wallet (5-250 chars)"
          value={about}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAbout(e.target.value)
          }
          testId="profile-about"
          error={!aboutValid}
          helperText={!aboutValid ? "Must be 5-250 characters." : undefined}
        />

        <FormControlLabel
          control={
            <Switch
              checked={addToWebMap}
              onChange={(e) => setAddToWebMap(e.target.checked)}
              data-test="profile-web-map"
            />
          }
          label="Show this wallet on the public web map"
        />

        {error && (
          <Typography color="error" variant="body2" data-test="profile-error">
            {error}
          </Typography>
        )}

        <Button
          data-test="profile-save"
          fullWidth
          size="large"
          variant="contained"
          disabled={!canSave}
          onClick={handleSave}
          sx={{ mt: 1.5, textTransform: "uppercase" }}
        >
          {saving ? "Saving…" : "Save"}
        </Button>
      </Box>
    </Drawer>
  );
};

export default WalletProfileDrawer;
