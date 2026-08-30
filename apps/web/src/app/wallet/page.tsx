"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function WalletPage() {
  const [open, setOpen] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setWalletName("");
    setWalletDescription("");
  };

  const handleCreate = () => {
    alert(`Creating wallet: ${walletName} - ${walletDescription}`);
    handleClose();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f2f5f3",
        padding: 3,
        fontFamily: "Arial, sans-serif",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}>
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: "#689f38",
            fontWeight: 500,
            fontSize: "14px",
            textTransform: "uppercase",
            padding: 0,
            minWidth: "auto",
          }}
          onClick={handleOpen}>
          Create Wallet
        </Button>

        <IconButton>
          <MoreVertIcon sx={{ color: "#777" }} />
        </IconButton>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#2e2e2e", mb: 2 }}>
        Your wallets
      </Typography>

      <Paper
        elevation={1}
        sx={{
          padding: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box>
          <Typography sx={{ fontSize: 16, color: "#2e2e2e" }}>
            Wallet 1
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#777c7f", mt: 0.5 }}>
            May 16, 2024
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ fontSize: 15, fontWeight: 500, color: "#689f38" }}>
            3455
          </Typography>
          <ChevronRightIcon sx={{ fontSize: 18, color: "#689f38" }} />
        </Stack>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 3, p: 2 },
        }}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Provide wallet details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={walletName}
            onChange={e => setWalletName(e.target.value)}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            minRows={2}
            value={walletDescription}
            onChange={e => setWalletDescription(e.target.value)}
            helperText="This text will be visible when you share your wallet."
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            disabled={!walletName}
            onClick={handleCreate}
            sx={{
              backgroundColor: "#ccc",
              color: "#fff",
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:disabled": {
                backgroundColor: "#eee",
                color: "#999",
              },
            }}>
            Create Wallet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
