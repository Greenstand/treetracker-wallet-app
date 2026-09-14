"use client";

import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useIncomingTransfers } from "@treetracker/wallet";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Notifications() {
  const router = useRouter();
  const { incoming, isLoading } = useIncomingTransfers();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }} data-test="notifications-page">
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        Notifications
      </Typography>

      <Stack spacing={1} data-test="notifications-list">
        {incoming.length === 0 && (
          <Box sx={{ textAlign: "center", color: "text.secondary", py: 6 }}>
            <NotificationsOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
            <Typography variant="body2">No notifications yet.</Typography>
          </Box>
        )}

        {incoming.map((t) => (
          <Paper
            key={t.id}
            data-test={`notification-item-${t.id}`}
            onClick={() =>
              router.push(
                `/notifications/details?id=${encodeURIComponent(t.id)}`,
              )
            }
            sx={{ p: 2, cursor: "pointer", "&:hover": { bgcolor: "grey.50" } }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "green" }}>
                <NotificationsOutlinedIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body1" fontWeight={600}>
                  Pending token from {t.source_wallet ?? "another wallet"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t.token_count ?? 1} token(s) to{" "}
                  {t.destination_wallet ?? "your wallet"} — tap to review and
                  accept
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
