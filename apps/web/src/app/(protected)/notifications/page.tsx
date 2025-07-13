"use client";

import * as React from "react";
import { Container, Box, Typography } from "@mui/material";
import { NotificationsList } from "@/components/NotificationsList";

interface Notification {
  title: string;
  description: string;
  time: string;
  thirdParty: string;
}

const notificationsData: Notification[] = [
  {
    title: "Pending Tokens from Restaurant XY to Wallet 1",
    description:
      "You will receive the confirmation once the transaction is successful.",
    time: "1h",
    thirdParty: "Restaurant XY",
  },
  {
    title: "Received Tokens from Restaurant XY to Wallet 1",
    description:
      "You received 100 tokens to your Wallet 1 from Restaurant XY_wallet",
    time: "6d",
    thirdParty: "Restaurant XY",
  },
  {
    title: "Pending tokens from Restaurant XY to Wallet 1",
    description:
      "You will receive the confirmation once the transaction is successful.",
    time: "6d",
    thirdParty: "Restaurant XY",
  },
  {
    title: "Sent tokens to Greenstand from Wallet 2",
    description: "You sent 200 tokens from your Wallet 2 to Greenstand_wallet",
    time: "5h",
    thirdParty: "Green Stand",
  },
];

export default function Notifications() {
  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <NotificationsList notifications={notificationsData} />
    </Container>
  );
}
