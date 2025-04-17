"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { Container } from "@mui/material";
import Header from "@/components/header/Header";
import BottomNavigationBar from "@/components/navigation/BottomNavigatorBar";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function RootLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup"];

  const isAuthPage = authRoutes.includes(pathname ?? "");

  return (
    <html lang="en">
      <body style={{ backgroundColor: theme.palette.background.default }}>
        <ProtectedRoute>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {!isAuthPage && <Header />}
              <Container maxWidth="sm">{props.children}</Container>
              {!isAuthPage && <BottomNavigationBar />}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}
