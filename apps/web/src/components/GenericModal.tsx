"use client";

import React from "react";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showHeader?: boolean;
  headerContent?: React.ReactNode;
}

export default function GenericModal({
  open,
  onClose,
  children,
  showHeader = true,
  headerContent,
}: GenericModalProps) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "grey.100",
        zIndex: 1300,
        overflow: "hidden",
      }}>
      {/* Header */}
      {showHeader && (
        <AppBar
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "grey.100",
            color: "black",
            boxShadow: "none",
            zIndex: 1,
          }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
            <Box>{headerContent}</Box>
            <IconButton edge="end" color="inherit" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Scrollable Content */}
      <Box
        sx={{
          maxHeight: showHeader ? "calc(100vh - 120px)" : "calc(100vh - 64px)",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
        }}>
        {children}
      </Box>
    </Box>
  );
}
