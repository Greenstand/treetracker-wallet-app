"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import NotificationHeader from "./NotificationHeader";
import { useHeader } from "@/context/HeaderContext";

const styles = {
  sharedBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerLogoBox: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
};

function DefaultHeaderView() {
  return (
    <Box sx={styles.sharedBox}>
      <Box sx={styles.headerLogoBox}>
        <HeaderLogo />
        <Typography variant="h5" noWrap>
          Treetrader
        </Typography>
      </Box>
    </Box>
  );
}

function ExpandedSearchView({
  onSearchCollapse,
}: {
  onSearchCollapse: () => void;
}) {
  return (
    <Box sx={styles.sharedBox}>
      <HeaderSearch
        isExpanded={true}
        onCollapse={onSearchCollapse}
        onExpand={() => {}}
      />
    </Box>
  );
}

export default function Header() {
  const { isSearchExpanded, setIsSearchExpanded, toggleSearchExpanded } =
    useHeader();

  const pathname = usePathname();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        width: "100%",
        backgroundColor:
          pathname === "/notifications"
            ? (theme) => theme.palette.secondary.main
            : isSearchExpanded
              ? "transparent"
              : (theme) => theme.palette.header.main,
        padding: isSearchExpanded
          ? (theme) => theme.spacing(2)
          : (theme) => theme.spacing(2, 4),
        transition: "background-color 0.3s ease",
      }}
    >
      {pathname === "/notifications" ? (
        <NotificationHeader onCollapse={() => setIsSearchExpanded(false)} />
      ) : isSearchExpanded ? (
        <ExpandedSearchView onSearchCollapse={toggleSearchExpanded} />
      ) : (
        <DefaultHeaderView />
      )}
    </Box>
  );
}
