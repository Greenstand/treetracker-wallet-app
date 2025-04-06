import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import theme from "@/theme";

interface WalletDrawerFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  onClose: () => void;
  existingWallets: { name: string; createdAt: string; amount: number }[];
  open: boolean;
  onAddWallet: (newWallet: { name: string; description?: string }) => void; // Add this prop
}

export default function WalletDrawerForm({
  name,
  setName,
  description,
  setDescription,
  onClose,
  existingWallets,
  open,
  onAddWallet,
}: WalletDrawerFormProps) {
  const [isUnique, setIsUnique] = useState(true);

  useEffect(() => {
    setIsUnique(
      !existingWallets.some(
        wallet =>
          wallet.name.trim().toLowerCase() === name.trim().toLowerCase(),
      ),
    );
  }, [name, existingWallets]);

  const isValid = name.trim() && isUnique;

  const handleCreateWallet = () => {
    if (isValid) {
      onAddWallet({ name, description: description.trim() || undefined });
      setName(""); // Reset form
      setDescription("");
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.paper }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ bgcolor: "white" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Provide Wallet Details
          </Typography>
          <IconButton edge="end" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <TextField
        placeholder="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={e => setName(e.target.value)}
        label="Name"
        error={!isUnique && name.trim() !== ""}
        helperText={
          !isUnique && name.trim() !== "" ? "Wallet name should be unique" : " "
        }
        FormHelperTextProps={{
          sx: { color: "red", fontSize: "0.75rem", marginLeft: 0 },
        }}
        InputProps={{
          disableUnderline: true,
          sx: {
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${
              !isUnique && name.trim() !== ""
                ? theme.palette.error.main
                : "black"
            }`,
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
          endAdornment:
            !isUnique && name.trim() !== "" ? (
              <InputAdornment position="end">
                <ErrorOutlineIcon color="error" />
              </InputAdornment>
            ) : null,
        }}
        variant="filled"
      />

      <TextField
        placeholder="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={e => setDescription(e.target.value)}
        label="Description"
        InputProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            borderBottom: "1px solid black",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
        }}
        variant="filled"
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleCreateWallet} // Add click handler
        sx={{
          mt: 3,
          bgcolor: isValid ? theme.palette.primary.main : "#ccc",
          color: isValid ? "white" : "#666",
          pointerEvents: isValid ? "auto" : "none",
          textTransform: "none",
        }}>
        Create Wallet
      </Button>
    </Box>
  );
}
