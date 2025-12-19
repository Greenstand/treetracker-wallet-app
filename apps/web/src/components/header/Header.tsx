"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Box, Typography, IconButton } from "@mui/material";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import NotificationHeader from "./NotificationHeader";
import { useHeader } from "@/context/HeaderContext";
import FilterListIcon from "@mui/icons-material/FilterList";

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
  headerSearchBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};

function DefaultHeaderView({ onSearchExpand }: { onSearchExpand: () => void }) {
  return (
    <Box sx={styles.sharedBox}>
      <Box sx={styles.headerLogoBox}>
        <HeaderLogo />
        <Typography variant="h5" noWrap>
          Tree Trader
        </Typography>
      </Box>

      <Box sx={styles.headerSearchBox}>
        <HeaderSearch
          data-cy="search-toggle"
          onExpand={onSearchExpand}
          isExpanded={false}
          onCollapse={() => {}}
        />

        <IconButton
          sx={{
            ml: 1,
            backgroundColor: (theme) => theme.palette.header.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
          onClick={() => {
            console.log("filter clicked");
          }}
        >
          <FilterListIcon
            sx={{ color: (theme) => theme.palette.common.white }}
          />
        </IconButton>
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
    <>
      <Box
        sx={{
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
          <DefaultHeaderView onSearchExpand={toggleSearchExpanded} />
        )}
      </Box>
    </>
  );
}
