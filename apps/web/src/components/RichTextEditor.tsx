"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  Divider,
  Tooltip,
  Stack,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  "data-test"?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  disabled = false,
  "data-test": dataTest,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  // Handle input changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  // Update which formats are active at cursor position
  const updateActiveFormats = () => {
    const formats: Record<string, boolean> = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    };
    setActiveFormats(formats);
  };

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
    handleInput();
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      handleCommand("createLink", url);
    }
  };

  const handleFormat = (command: string) => {
    handleCommand(command);
  };

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      {/* Toolbar */}
      <Box
        sx={{
          p: 1,
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          gap: 0.5,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Tooltip title="Bold">
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault();
              handleFormat("bold");
            }}
            sx={{
              backgroundColor: activeFormats.bold ? "#e0e0e0" : "transparent",
            }}
            disabled={disabled}
          >
            <FormatBoldIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault();
              handleFormat("italic");
            }}
            sx={{
              backgroundColor: activeFormats.italic ? "#e0e0e0" : "transparent",
            }}
            disabled={disabled}
          >
            <FormatItalicIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault();
              handleFormat("underline");
            }}
            sx={{
              backgroundColor: activeFormats.underline ? "#e0e0e0" : "transparent",
            }}
            disabled={disabled}
          >
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

        <Tooltip title="Bullet List">
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault();
              handleFormat("insertUnorderedList");
            }}
            disabled={disabled}
          >
            <FormatListBulletedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault();
              handleFormat("insertOrderedList");
            }}
            disabled={disabled}
          >
            <FormatListNumberedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

        <Tooltip title="Insert Link">
          <IconButton
            size="small"
            onMouseDown={(e) => {
              e.preventDefault();
              handleLink();
            }}
            disabled={disabled}
          >
            <LinkIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Editor */}
      <Box
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        data-test={dataTest}
        sx={{
          p: 2,
          minHeight: 200,
          outline: "none",
          fontSize: "1rem",
          lineHeight: 1.5,
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.6 : 1,
          "& ul, & ol": {
            ml: 2,
          },
          "& li": {
            mb: 0.5,
          },
          "& a": {
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer",
          },
        }}
      />
    </Paper>
  );
};

export default RichTextEditor;
