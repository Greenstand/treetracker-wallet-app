"use client";

import React, { useState } from "react";
import { Drawer } from "@mui/material";
import WalletDrawerForm from "./WalletDrawerForm";
import DiscardModal from "./DiscardModal";

interface CreateWalletDrawerProps {
  open: boolean;
  onClose: () => void;
  wallets: any[];
  onAddWallet: (newWallet: { name: string; description?: string }) => void; // Add this prop
}

export default function CreateWalletDrawer({
  open,
  onClose,
  wallets,
  onAddWallet,
}: CreateWalletDrawerProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const handleCloseAttempt = () => {
    if (name.trim() || description.trim()) {
      setConfirmDiscard(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    setName("");
    setDescription("");
    setConfirmDiscard(false);
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleCloseAttempt}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}>
        <WalletDrawerForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          onClose={handleCloseAttempt}
          existingWallets={wallets}
          open={open}
          onAddWallet={onAddWallet} // Pass the callback to WalletDrawerForm
        />
      </Drawer>

      <DiscardModal
        open={confirmDiscard}
        onKeep={() => setConfirmDiscard(false)}
        onDiscard={handleDiscard}
      />
    </>
  );
}
