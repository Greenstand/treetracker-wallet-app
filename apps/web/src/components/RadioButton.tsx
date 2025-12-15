"use client";

import * as React from "react";
import { Box, Radio, FormControlLabel } from "@mui/material";

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

export default function RadioButton({
  label,
  value,
  checked,
  onChange,
}: RadioButtonProps) {
  return (
    <Box sx={{ py: 0.25 }}>
      <FormControlLabel
        control={
          <Radio
            checked={checked}
            onChange={onChange}
            value={value}
            inputProps={{ "aria-label": label }}
          />
        }
        label={label}
      />
    </Box>
  );
}
