"use client";

import * as React from "react";
import { TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

// HTML number inputs happily accept these keys, but tree token amounts are
// strictly discrete positive integers: no exponential notation ("e" / "E"),
// no signs ("+" / "-") and no decimals ("."). See #919.
const BLOCKED_KEYS = ["e", "E", "+", "-", "."];

/**
 * Keeps only digit characters in a token amount. The keydown guard blocks the
 * scientific-notation keys, but pasted or autofilled values bypass keydown,
 * so the value is sanitized here as well (e.g. "2e3" -> "23").
 */
export function sanitizeTokenAmount(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export function AmountField({
  value,
  onChange,
  error,
  helperText,
  label = "Amount (number of tokens)",
  sx,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <TextField
      fullWidth
      type="number"
      label={label}
      value={value}
      onChange={(e) => onChange(sanitizeTokenAmount(e.target.value))}
      onKeyDown={(e) => {
        if (BLOCKED_KEYS.includes(e.key)) e.preventDefault();
      }}
      inputProps={{ min: 1, step: 1 }}
      error={error}
      helperText={helperText}
      sx={sx}
      data-test="send-amount"
    />
  );
}