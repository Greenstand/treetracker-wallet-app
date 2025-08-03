"use client";

import React, { useMemo, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import { ActivityItem } from "../../../components/ActivityItem";
import SendRequestModal from "../../../components/SendRequestModal";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useAtom } from "jotai";
import { searchAtom } from "../../../components/header/Header";

const walletsData = [{ title: "Restaurant XY" }, { title: "Greenstand" }];

export default function Send() {
  const [searchTerm] = useAtom(searchAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  const filteredWallets = useMemo(() => {
    if (!searchTerm.trim()) {
      return walletsData.map(wallet => ({ ...wallet, isHighlighted: false }));
    }

    return walletsData
      .filter(wallet =>
        wallet.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map(wallet => ({
        ...wallet,
        isHighlighted: true,
      }));
  }, [searchTerm]);

  const handleWalletClick = (walletTitle: string) => {
    setSelectedWallet(walletTitle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedWallet("");
  };

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
        <Typography>
          Top wallets {searchTerm && `(filtered by "${searchTerm}")`}
        </Typography>
        {filteredWallets.length > 0 ? (
          filteredWallets.map((item, index) => (
            <ActivityItem
              key={index}
              title={item.title}
              amount={0}
              status={""}
              searchTerm={searchTerm}
              isHighlighted={item.isHighlighted}
              onClick={() => handleWalletClick(item.title)}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            No wallets found matching &quot;{searchTerm}&quot;
          </Typography>
        )}
      </Box>

      <SendRequestModal
        open={modalOpen}
        onClose={handleCloseModal}
        recipientName={selectedWallet}
      />
    </Box>
  );
}
