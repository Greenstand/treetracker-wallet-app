"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomTextField from "@/components/common/CustomTextField";

interface WalletCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: { name: string; description: string }) => void;
}

const WalletCreateDrawer: React.FC<WalletCreateDrawerProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
    }
  }, [open]);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: description.trim() });
    onClose();
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
      }}>
      <Box sx={{ p: 2.5, pb: 1.5, display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, flex: 1, letterSpacing: 0.2 }}>
          Provide wallet details
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ p: 2.5 }}>
        <CustomTextField
          label="Name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          testId="wallet-name-input"
        />

        <CustomTextField
          label="Description"
          name="description"
          placeholder="This text will be visible when you share your wallet."
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          testId="wallet-description-input"
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={!name.trim()}
          onClick={handleCreate}
          sx={{
            mt: 1.5,
            ":disabled": {
              backgroundColor: "#E0E0E0",
              color: "#9E9E9E",
            },
            textTransform: "uppercase",
          }}>
          Create Wallet
        </Button>
      </Box>
    </Drawer>
  );
};

export default WalletCreateDrawer;
