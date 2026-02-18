"use client";

import { Box, Typography, IconButton, Drawer, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InfoDrawerPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        bgcolor: "transparent",
      }}>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
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
        }}>
        <Container maxWidth="xs" sx={{ p: 0 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <Typography fontWeight={600} fontSize={16}>
              Good-to-know
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography mt={1} fontSize={14} color="text.secondary">
            You can have up to 2 wallets.
          </Typography>
        </Container>
      </Drawer>
    </Box>
  );
}
