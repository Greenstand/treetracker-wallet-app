"use client";

import { useState, type ReactNode, type SyntheticEvent } from "react";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface WalletActionButtonProps {
  label: string;
  startIcon: ReactNode;
  onClick?: () => void;
}

export function WalletActionButton({
  label,
  startIcon,
  onClick,
}: WalletActionButtonProps) {
  return (
    <ButtonBase
      aria-label={label}
      onClick={onClick}
      sx={{
        display: "grid",
        gridTemplateColumns: "24px 1fr 24px",
        gap: 1.5,
        width: "100%",
        minHeight: 48,
        px: 2,
        py: 1.5,
        color: "text.primary",
        textAlign: "left",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: -2,
        },
      }}
    >
      <Box aria-hidden="true" sx={{ display: "flex", color: "text.secondary" }}>
        {startIcon}
      </Box>
      <Typography component="span" variant="body1">
        {label}
      </Typography>
      <ChevronRightIcon
        aria-hidden="true"
        sx={{ color: "text.secondary", fontSize: 22 }}
      />
    </ButtonBase>
  );
}

interface WalletDetailsProps {
  tokenAmount: number;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  activityContent?: ReactNode;
}

export default function WalletDetails({
  tokenAmount,
  isLoading = false,
  onEdit,
  onDelete,
  activityContent,
}: WalletDetailsProps) {
  const [activeTab, setActiveTab] = useState<"activity" | "details">("details");

  const handleTabChange = (
    _event: SyntheticEvent,
    value: "activity" | "details",
  ) => setActiveTab(value);

  return (
    <Box data-test="wallet-details-tabs">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Wallet details sections"
        centered
        sx={{ mb: 2, "& .MuiTab-root": { minHeight: 48, px: 3 } }}
      >
        <Tab
          id="wallet-activity-tab"
          aria-controls="wallet-activity-panel"
          label="Activity"
          value="activity"
        />
        <Tab
          id="wallet-details-tab"
          aria-controls="wallet-details-panel"
          label="Details"
          value="details"
        />
      </Tabs>

      {activeTab === "details" && (
        <Stack
          id="wallet-details-panel"
          role="tabpanel"
          aria-labelledby="wallet-details-tab"
          spacing={3}
          data-test="wallet-details-summary"
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 72,
              px: 2,
              py: 1.5,
            }}
          >
            {isLoading ? (
              <CircularProgress
                aria-label="Loading token balance"
                size={32}
                data-test="wallet-details-balance-loading"
              />
            ) : (
              <Typography
                component="p"
                variant="h4"
                data-test="wallet-details-balance"
              >
                {tokenAmount}
              </Typography>
            )}

            <Stack direction="row" alignItems="center" spacing={1}>
              <TollOutlinedIcon aria-hidden="true" color="action" />
              <Typography color="text.secondary">Tokens</Typography>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ overflow: "hidden" }}>
            <WalletActionButton
              label="Edit wallet"
              startIcon={<EditOutlinedIcon fontSize="small" />}
              onClick={onEdit}
            />
            <Divider />
            <WalletActionButton
              label="Delete wallet"
              startIcon={<DeleteOutlineIcon fontSize="small" />}
              onClick={onDelete}
            />
          </Paper>
        </Stack>
      )}

      {activeTab === "activity" && (
        <Box
          id="wallet-activity-panel"
          role="tabpanel"
          aria-labelledby="wallet-activity-tab"
          data-test="wallet-activity-panel"
        >
          {activityContent ?? (
            <Typography color="text.secondary" sx={{ py: 3 }}>
              No wallet activity available.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
