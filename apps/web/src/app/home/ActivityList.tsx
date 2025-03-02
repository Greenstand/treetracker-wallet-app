"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { ActivityItem } from "./ActivityItem";

export function ActivityList({ activityData }: { activityData: any[] }) {
  return (
    <Box>
      {activityData.map((item, index) => (
        <ActivityItem
          key={index}
          title={item.title}
          amount={item.amount}
          status={item.status}
        />
      ))}
    </Box>
  );
}
