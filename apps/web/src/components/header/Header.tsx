"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(prev => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: isSearchExpanded
          ? "transparent"
          : theme => theme.palette.primary.light,
        padding: isSearchExpanded
          ? theme => theme.spacing(2)
          : theme => theme.spacing(2, 4),
        transition: "background-color 0.3s ease",
      }}>
      {isSearchExpanded ? (
        // Search Bar Expanded View
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <HeaderSearch
            isExpanded={isSearchExpanded}
            onCollapse={handleSearchToggle}
            onExpand={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      ) : (
        // Default Header View
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}>
            <HeaderLogo />
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: theme => theme.palette.text.disabled,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              Tree Trader
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <HeaderSearch
              onExpand={handleSearchToggle}
              isExpanded={false}
              onCollapse={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
