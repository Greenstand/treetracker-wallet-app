"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";

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
          onExpand={onSearchExpand}
          isExpanded={false}
          onCollapse={() => {}}
        />
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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleSearchBar = () => setIsSearchExpanded(prev => !prev);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: isSearchExpanded
            ? "transparent"
            : theme => theme.palette.header.main,
          padding: isSearchExpanded
            ? theme => theme.spacing(2)
            : theme => theme.spacing(2, 4),
          transition: "background-color 0.3s ease",
        }}>
        {isSearchExpanded ? (
          <ExpandedSearchView onSearchCollapse={toggleSearchBar} />
        ) : (
          <DefaultHeaderView onSearchExpand={toggleSearchBar} />
        )}
      </Box>
    </>
  );
}
