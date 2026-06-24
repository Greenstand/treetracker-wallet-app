"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, Stack, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetTokens } from "@treetracker/wallet";
import WalletDetailsSummary from "@/components/WalletDetails";

function WalletDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const name = params?.get("name") ?? "";

  const { tokens, isTokensLoading, error } = useGetTokens(name);

  const activityContent = (
    <>
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
        {tokens.map((token: { id: string }) => (
          <Paper
            key={token.id}
            sx={{
              p: 2,
              cursor: "pointer",
              "&:hover": { bgcolor: "grey.50" },
            }}
            data-test={`token-item-${token.id}`}
            onClick={() =>
              router.push(
                `/token/details?id=${token.id}&wallet=${encodeURIComponent(name)}`,
              )
            }
          >
            <Typography variant="body2">{token.id}</Typography>
          </Paper>
        ))}
      </Stack>
    </>
  );

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

      <Typography variant="h6" fontWeight={600} data-test="wallet-details-name">
        {name}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <WalletDetailsSummary
          tokenAmount={tokens.length}
          isLoading={isTokensLoading}
          activityContent={activityContent}
        />
      </Box>
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
