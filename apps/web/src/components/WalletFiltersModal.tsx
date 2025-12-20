"use client";

import * as React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import RadioButton from "./RadioButton";
import DateRangeInput from "./DateRangeInput";

export type WalletFilterOption = "all" | "past90days" | "may" | "year2024";

export interface WalletFiltersValue {
  option: WalletFilterOption;
  startDate?: string;
  endDate?: string;
}

interface WalletFiltersModalProps {
  open: boolean;
  value: WalletFiltersValue;
  onClose: () => void;
  onChange: (next: WalletFiltersValue) => void;
  onApply: (value: WalletFiltersValue) => void;
}

export default function WalletFiltersModal({
  open,
  value,
  onClose,
  onChange,
  onApply,
}: WalletFiltersModalProps) {
  const setOption = (option: WalletFilterOption) => {
    onChange({ ...value, option });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          m: 0,
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Filters
          </Typography>

          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Filter Options */}
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
          Filter by date
        </Typography>

        <Box role="radiogroup" sx={{ mb: 2 }}>
          <RadioButton
            label="All"
            value="all"
            checked={value.option === "all"}
            onChange={() => setOption("all")}
          />
          <RadioButton
            label="Past 90 days"
            value="past90days"
            checked={value.option === "past90days"}
            onChange={() => setOption("past90days")}
          />
          <RadioButton
            label="May"
            value="may"
            checked={value.option === "may"}
            onChange={() => setOption("may")}
          />
          <RadioButton
            label="2024"
            value="year2024"
            checked={value.option === "year2024"}
            onChange={() => setOption("year2024")}
          />
        </Box>

        {/* Date Range */}
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
          Choose a date range
        </Typography>

        <DateRangeInput
          startDate={value.startDate ?? ""}
          endDate={value.endDate ?? ""}
          onChangeStart={(startDate) => onChange({ ...value, startDate })}
          onChangeEnd={(endDate) => onChange({ ...value, endDate })}
        />

        {/* Apply */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.4, borderRadius: 2 }}
          onClick={() => onApply(value)}
        >
          Apply
        </Button>
      </DialogContent>
    </Dialog>
  );
}
