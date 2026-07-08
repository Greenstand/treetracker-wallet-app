"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { tokenAtom } from "core";
import { accountUrl } from "../../../../auth/keycloak";

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

    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TREETRACKER_USER_API}/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Session expired"
              : "Failed to load profile",
          );
        }

        const data = await response.json();
        setEmail(data.email);

        const date = new Date(data.createdAt);
        const formattedDate = date.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setCreatedAt(formattedDate);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleSecurityClick = () => {
    const url = accountUrl();
    if (url) {
      window.open(url, "_blank");
    }
  };

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
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Email
            </Typography>
            <Typography
              variant="body1"
              data-test="settings-account-email"
              sx={{ marginBottom: "16px" }}
            >
              {email}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Member Since
            </Typography>
            <Typography
              variant="body1"
              data-test="settings-account-created"
              sx={{ marginBottom: "16px" }}
            >
              {createdAt}
            </Typography>
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
