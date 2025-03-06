"use client";

import * as React from "react";
import { Typography, Box } from "@mui/material";
import { ActivityList } from "./ActivityList";

export function RecentActivity({ activityData }: { activityData: any[] }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Recent Activity</Typography>
        {/* Make view all align with activity title */}
        <Typography
          variant="body2"
          color="primary"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            alignSelf: "center",
          }}>
          View all
        </Typography>
      </Box>
      <ActivityList activityData={activityData} />
    </Box>
  );
}
