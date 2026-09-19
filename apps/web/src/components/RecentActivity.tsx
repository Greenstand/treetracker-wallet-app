"use client";

import * as React from "react";
import { Typography, Box, Skeleton, Link } from "@mui/material";
import NextLink from "next/link";
import { ActivityList } from "./ActivityList";
import type { ActivityEntry } from "./activity.types";

export function RecentActivity({
  activityData,
  isLoading = false,
}: {
  activityData: ActivityEntry[];
  isLoading?: boolean;
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Recent Activity</Typography>
        <Link
          component={NextLink}
          href="/transfers"
          variant="body2"
          underline="hover"
          sx={{ color: "green", alignSelf: "center" }}
          data-test="recent-activity-view-all"
        >
          View all
        </Link>
      </Box>

      {isLoading ? (
        <Box sx={{ mt: 1 }}>
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} variant="rounded" height={64} sx={{ my: 0.5 }} />
          ))}
        </Box>
      ) : activityData.length === 0 ? (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No recent activity yet — your sent and received tokens will appear
            here.
          </Typography>
        </Box>
      ) : (
        <ActivityList activityData={activityData} />
      )}
    </Box>
  );
}
