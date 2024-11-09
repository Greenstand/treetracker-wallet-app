// components/ThemeProvider.tsx
"use client";

import { Container, CssBaseline } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

const MUIThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
