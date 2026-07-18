"use client";

import { useEffect, useState, type ReactNode } from "react";
import { worker } from "@treetracker/msw/src/browser";

export function MSWProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    async function startWorker() {
      await worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: { url: "/mockServiceWorker.js" },
      });
      setReady(true);
    }

    startWorker().catch((e) => console.error("[MSW]", e));
  }, []);

  if (process.env.NODE_ENV === "development" && !ready) return null;
  return children;
}
