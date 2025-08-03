"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAtom } from "jotai";
import { searchAtom } from "./Header";

interface HeaderSearchProps {
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export default function HeaderSearch({
  isExpanded,
  onExpand,
  onCollapse,
}: HeaderSearchProps) {
  const [searchText, setSearchText] = useState("");
  const [, setGlobalSearchTerm] = useAtom(searchAtom);

  useEffect(() => {
    setGlobalSearchTerm(searchText);
  }, [searchText, setGlobalSearchTerm]);

  const handleCollapse = () => {
    setSearchText("");
    setGlobalSearchTerm("");
    onCollapse();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: isExpanded ? "flex-start" : "center",
        position: "relative",
        width: "100%",
      }}>
      {isExpanded ? (
        <>
          <IconButton
            onClick={handleCollapse}
            sx={{
              mr: 1,
              backgroundColor: theme => theme.palette.grey[200],
              "&:hover": { backgroundColor: theme => theme.palette.grey[300] },
            }}>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            placeholder="Search by name, company, or wallet"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              backgroundColor: theme => theme.palette.common.white,
              borderRadius: theme => theme.shape.borderRadius,
            }}
          />
        </>
      ) : (
        <IconButton
          onClick={onExpand}
          sx={{
            backgroundColor: theme => theme.palette.header.main,
            "&:hover": { backgroundColor: theme => theme.palette.primary.dark },
          }}>
          <SearchIcon sx={{ color: theme => theme.palette.common.white }} />
        </IconButton>
      )}
    </Box>
  );
}
