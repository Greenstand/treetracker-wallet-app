"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Paper,
  Stack,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

const wallets = [
  { name: "Wallet 2", date: "May 22, 2024", balance: 1000 },
  { name: "Wallet 1", date: "May 16, 2024", balance: 3455 },
];

export default function ExceededLimitPage() {
  const [mounted, setMounted] = useState(false);
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        bgcolor: "#F4F4F4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Roboto, sans-serif",
      }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F4F4F4",
        }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#8BC34A",
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography fontSize={14} fontWeight={500} color="white">
            Wallet logo
          </Typography>
          <Box>
            <IconButton size="small" sx={{ color: "white" }}>
              <SearchIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "white" }}>
              <FilterListIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2 }}>
          {/* Create Wallet */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}>
            <Typography fontSize={13} color="gray">
              + CREATE WALLET
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={() => setShowInfoDrawer(true)}
                size="small"
                sx={{ color: "gray", p: 0.5 }}>
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <Divider orientation="vertical" flexItem />
            </Box>
          </Box>

          {/* Title */}
          <Typography fontWeight={600} fontSize={14} mb={1.5}>
            Your wallets
          </Typography>

          {/* Wallet Cards */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "white",
              border: "1px solid #e0e0e0",
            }}>
            {wallets.map((wallet, idx) => (
              <Box
                key={wallet.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                  borderBottom:
                    idx < wallets.length - 1 ? "1px solid #eee" : "none",
                }}>
                <Box>
                  <Typography fontSize={14} fontWeight={500}>
                    {wallet.name}
                  </Typography>
                  <Typography fontSize={12} color="gray">
                    {wallet.date}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography
                    fontSize={14}
                    sx={{ color: "#558B2F", fontWeight: 600 }}>
                    {wallet.balance}
                  </Typography>
                  <ChevronRightIcon sx={{ fontSize: 18, color: "#999" }} />
                </Stack>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>

      {/* Drawer for Info */}
      <Drawer
        anchor="bottom"
        open={showInfoDrawer}
        onClose={() => setShowInfoDrawer(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 360,
            mx: "auto",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            px: 2,
            pt: 2,
            pb: 4,
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          },
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} fontSize={16}>
            Good-to-know
          </Typography>
          <IconButton onClick={() => setShowInfoDrawer(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography mt={1.5} fontSize={14} color="text.secondary">
          You can have up to 2 wallets.
        </Typography>
      </Drawer>
    </Box>
  );
}
