"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { ActivityItem } from "./ActivityItem";
import type { ActivityEntry } from "./activity.types";

export function ActivityList({
  activityData,
}: {
  activityData: ActivityEntry[];
}) {
  return (
    <Box>
      {activityData.map((item, index) => (
        <ActivityItem
          key={index}
          title={item.title}
          amount={item.amount}
          status={item.status}
          showAmount={item.showAmount}
        />
      ))}
    </Box>
  );
}
