"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Box, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import NotificationHeader from "./NotificationHeader";
import { useHeader } from "@/context/HeaderContext";

import WalletFiltersModal, { WalletFiltersValue } from "../WalletFiltersModal";

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
  headerActionsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 1,
  },
};

function DefaultHeaderView({
  onSearchExpand,
  onFilterOpen,
}: {
  onSearchExpand: () => void;
  onFilterOpen: () => void;
}) {
  return (
    <Box sx={styles.sharedBox}>
      <Box sx={styles.headerLogoBox}>
        <HeaderLogo />
        <Typography variant="h5" noWrap>
          Tree Trader
        </Typography>
      </Box>

      <Box sx={styles.headerActionsBox}>
        <HeaderSearch
          data-cy="search-toggle"
          onExpand={onSearchExpand}
          isExpanded={false}
          onCollapse={() => {}}
        />

        <IconButton
          aria-label="filter"
          onClick={onFilterOpen}
          sx={{
            backgroundColor: (theme) => theme.palette.header.main,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
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

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const [filters, setFilters] = React.useState<WalletFiltersValue>({
    option: "all",
    startDate: "",
    endDate: "",
  });

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
          <DefaultHeaderView
            onSearchExpand={toggleSearchExpanded}
            onFilterOpen={() => setIsFilterOpen(true)}
          />
        )}
      </Box>

      <WalletFiltersModal
        open={isFilterOpen}
        value={filters}
        onClose={() => setIsFilterOpen(false)}
        onChange={setFilters}
        onApply={(v) => {
          setFilters(v);
          setIsFilterOpen(false);
        }}
      />
    </>
  );
}
