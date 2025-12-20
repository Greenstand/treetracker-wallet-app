"use client";

import * as React from "react";
import { Box, TextField } from "@mui/material";

interface DateRangeInputProps {
  startDate: string;
  endDate: string;
  onChangeStart: (v: string) => void;
  onChangeEnd: (v: string) => void;
}

export default function DateRangeInput({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}: DateRangeInputProps) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        fullWidth
        label="From"
        type="date"
        value={startDate}
        onChange={(e) => onChangeStart(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ "aria-label": "Start date" }}
      />
      <TextField
        fullWidth
        label="To"
        type="date"
        value={endDate}
        onChange={(e) => onChangeEnd(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ "aria-label": "End date" }}
      />
    </Box>
  );
}
