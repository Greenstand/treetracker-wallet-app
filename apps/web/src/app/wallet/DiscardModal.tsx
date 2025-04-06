import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DiscardModalProps {
  open: boolean;
  onKeep: () => void;
  onDiscard: () => void;
}

export default function DiscardModal({
  open,
  onKeep,
  onDiscard,
}: DiscardModalProps) {
  return (
    <Modal open={open} onClose={onKeep}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: "12px 12px 4px 4px",
          width: 300,
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Discard changes?</Typography>
          <IconButton onClick={onKeep}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={{ my: 2 }}>
          Are you sure you want to discard this wallet?
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Button onClick={onKeep}>keep changes</Button>
          <Button
            onClick={onDiscard}
            sx={{ border: "1px solid red", color: "red" }}>
            DISCARD
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
