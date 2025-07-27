"use client";

import * as React from "react";
import { Container, Box } from "@mui/material";
import { TokenBalance } from "../../../components/TokenBalance";
import { WalletBalance } from "../../../components/WalletBalance";
import { RecentActivity } from "../../../components/RecentActivity";

const activityData = [
  { title: "Restaurant XY", amount: 200, status: "Pending" },
  { title: "Restaurant XY", amount: 100, status: "Received" },
  { title: "Greenstand", amount: -200, status: "Sent" },
];

export default function Page() {
  return (
    <Container maxWidth="lg" sx={{ mt: 1 }} data-test="home-page-element">
      <Box
        display="flex"
        flexDirection="row"
        gap={4}
        justifyContent="center"
        alignItems="center"
        width="100%">
        <TokenBalance tokenCount={1000} />
        <WalletBalance walletAmount={2} />
      </Box>
      <RecentActivity activityData={activityData} />
    </Container>
  );
}
