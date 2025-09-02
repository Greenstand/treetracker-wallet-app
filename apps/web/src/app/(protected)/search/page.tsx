"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useHeader } from "@/context/HeaderContext";
import { ActivityItem } from "@/components/ActivityItem";
import WalletDetailModal from "@/components/WalletDetailModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export interface Wallet {
  id: string;
  title: string;
  company: string;
  wallet: string;
  lastTransaction: string;
}

const WALLETS_DATA: Wallet[] = [
  {
    id: "1",
    title: "Restaurant XY",
    company: "Food & Beverage",
    wallet: "0x1234...5678",
    lastTransaction: "2024-07-30",
  },
  {
    id: "2",
    title: "Greenstand",
    company: "Environmental",
    wallet: "0x2345...6789",
    lastTransaction: "2024-07-31",
  },
  {
    id: "3",
    title: "Coffee Corner",
    company: "Food & Beverage",
    wallet: "0x3456...7890",
    lastTransaction: "2024-07-29",
  },
];

const ACTION_CONFIG = {
  send: {
    description: "Quickly send tokens to other wallets",
    sectionTitle: "Top wallets",
  },
  request: {
    description: "Quickly request tokens from other wallets",
    sectionTitle: "Recent contacts",
  },
} as const;

function SearchContent() {
  const searchParams = useSearchParams();
  const { setIsSearchExpanded, searchQuery } = useHeader();
  const [selectedWallet, setSelectedWallet] = useState<{
    title: string;
    wallet: string;
  } | null>(null);
  const [displayCount, setDisplayCount] = useState(10);

  const action =
    (searchParams?.get("action") as keyof typeof ACTION_CONFIG) || "send";
  const config = ACTION_CONFIG[action];

  useEffect(() => {
    if (action) {
      setIsSearchExpanded(true);
    }
  }, [action, setIsSearchExpanded]);

  const filteredWallets = searchQuery
    ? WALLETS_DATA.filter(
        wallet =>
          wallet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          wallet.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          wallet.wallet.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : WALLETS_DATA;

  const displayedWallets = searchQuery
    ? filteredWallets.slice(0, displayCount)
    : filteredWallets.slice(0, Math.min(displayCount, 6));

  return (
    <Box
      sx={{
        mt: 3,
        height: "calc(100vh - 120px)",
        overflow: "auto",
        paddingBottom: "40px",
        paddingX: 2,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(0,0,0,0.3)",
        },
      }}>
      {/* Search hint when search is expanded but no query */}
      {!searchQuery && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
          <Typography variant="body2" color="textSecondary">
            💡 Start typing to search by name, company, or wallet address
          </Typography>
        </Box>
      )}

      <Card sx={{ my: 0.5, p: 1, flex: 1, minWidth: "80%" }} variant="outlined">
        <CardContent sx={{ py: 0.5, "&:last-child": { pb: 0.5 } }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 40, height: 40 }}>
              <QrCodeIcon />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="textSecondary">
                Scan or show QR code
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                data-test="action-text">
                {config.description}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {searchQuery
            ? `Search results (${filteredWallets.length})`
            : config.sectionTitle}
        </Typography>

        {displayedWallets.length > 0 ? (
          <>
            {displayedWallets.map((item, index) => (
              <ActivityItem
                key={item.id}
                title={item.title}
                onClick={() => {
                  setSelectedWallet({
                    title: item.title,
                    wallet: item.wallet,
                  });
                  setIsSearchExpanded(false);
                }}
              />
            ))}
          </>
        ) : searchQuery ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="textSecondary">
              No wallets found for &quot;{searchQuery}&quot;
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Try searching by name, company, or wallet address
            </Typography>
          </Box>
        ) : (
          <>
            {displayedWallets.map((item, index) => (
              <ActivityItem
                key={`${item.title}-${index}`}
                title={item.title}
                onClick={() => {
                  setSelectedWallet({
                    title: item.title,
                    wallet: item.wallet,
                  });
                  setIsSearchExpanded(false);
                }}
              />
            ))}
          </>
        )}
      </Box>

      <Box sx={{ height: "60px" }} />

      {selectedWallet && (
        <WalletDetailModal
          open={Boolean(selectedWallet)}
          onClose={() => setSelectedWallet(null)}
          wallet={{
            walletName: selectedWallet.title,
            walletAddress: selectedWallet.wallet,
          }}
          defaultAction={action}
        />
      )}
    </Box>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  );
}
