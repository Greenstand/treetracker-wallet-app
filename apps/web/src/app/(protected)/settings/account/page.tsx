"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { accountUrl } from "../../../../auth/keycloak";
import {
  formatMemberSince,
  loadUserProfile,
} from "../../../../utils/userProfile";

export default function Account() {
  const router = useRouter();
  const token = useAtomValue(tokenAtom);
  const [email, setEmail] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Not authenticated");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      const profile = await loadUserProfile(token);
      if (cancelled) return;

      setEmail(profile.email);
      setCreatedAt(formatMemberSince(profile.createdAt));

      if (profile.sessionExpired) {
        setError("Session expired");
      } else if (!profile.email && !profile.createdAt) {
        setError("Failed to load profile");
      }

      setIsLoading(false);
    };

    fetchUserProfile();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSecurityClick = () => {
    const url = accountUrl();
    if (url) {
      window.open(url, "_blank");
    }
  };

  // Show whatever could be loaded. The error box replaces the card only when
  // nothing at all is known, so a single failing source no longer hides the email.
  const hasAnyDetail = Boolean(email || createdAt);

  return (
    <Box
      data-test="settings-account-page"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        gap: "16px",
        paddingBottom: "100px",
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/settings")}
        sx={{ color: "green", alignSelf: "flex-start" }}
        data-test="settings-account-back"
      >
        Back
      </Button>

      {/* Account Section */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "12px", fontWeight: 600 }}>
          Account
        </Typography>

        {isLoading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "24px" }}
          >
            <CircularProgress size={40} />
          </Box>
        ) : !hasAnyDetail ? (
          <Alert severity="error" data-test="settings-account-error">
            {error ?? "Failed to load profile"}
          </Alert>
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Email
            </Typography>
            {email ? (
              <Typography
                variant="body1"
                data-test="settings-account-email"
                sx={{ marginBottom: "16px" }}
              >
                {email}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                data-test="settings-account-email-missing"
                sx={{ marginBottom: "16px", color: "gray" }}
              >
                Not available
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Member Since
            </Typography>
            {createdAt ? (
              <Typography
                variant="body1"
                data-test="settings-account-created"
                sx={{ marginBottom: "16px" }}
              >
                {createdAt}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                data-test="settings-account-created-missing"
                sx={{ marginBottom: "16px", color: "gray" }}
              >
                Not available
              </Typography>
            )}

            {!createdAt || !email ? (
              <Typography
                variant="caption"
                data-test="settings-account-partial"
                sx={{ color: "gray" }}
              >
                Some account details cannot be loaded right now.
              </Typography>
            ) : null}
          </>
        )}
      </Box>

      {/* Security Section */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "12px", fontWeight: 600 }}>
          Security
        </Typography>
        <Button
          data-test="settings-security-link"
          onClick={handleSecurityClick}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            color: "inherit",
            padding: "12px 0",
            borderBottom: "1px solid #f0f0f0",
            "&:hover": {
              backgroundColor: "#f9f9f9",
            },
          }}
        >
          <Typography variant="body2">Manage password & security</Typography>
        </Button>
      </Box>

      {/* Logout Button */}
      <Button
        data-test="settings-logout-button"
        variant="contained"
        fullWidth
        onClick={() => router.push("/logout")}
        sx={{
          backgroundColor: "#d32f2f",
          color: "white",
          textTransform: "none",
          padding: "12px",
          marginTop: "8px",
          "&:hover": {
            backgroundColor: "#b71c1c",
          },
        }}
      >
        Log Out
      </Button>
    </Box>
  );
}
