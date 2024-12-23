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

export default function RootLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup"];

  // Check if the current route is an authentication page
  const isAuthPage = authRoutes.includes(pathname ?? "");

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!isAuthPage && <Header />}
            <Container maxWidth="sm">{props.children}</Container>
            {!isAuthPage && <BottomNavigationBar />}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
