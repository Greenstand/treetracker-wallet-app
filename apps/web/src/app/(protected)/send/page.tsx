"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import { ActivityItem } from "../../../components/ActivityItem";
import QrCodeIcon from "@mui/icons-material/QrCode";

const walletsData = [{ title: "Restaurant XY" }, { title: "Greenstand" }];

export default function Send() {
  return (
    <Box
      sx={{
        mt: 3,
      }}>
      <Card sx={{ my: 0.5, p: 1, flex: 1, minWidth: "80%" }}>
        <CardContent sx={{ py: 0.5, "&:last-child": { pb: 0.5 } }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 40, height: 40 }}>
              <QrCodeIcon />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="textSecondary">
                Scan or show QR code
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Quickly send or request tokens
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography>Top wallets</Typography>
        {walletsData.map((item, index) => (
          <ActivityItem key={index} title={item.title} amount={0} status={""} />
        ))}
      </Box>
    </Box>
  );
}
