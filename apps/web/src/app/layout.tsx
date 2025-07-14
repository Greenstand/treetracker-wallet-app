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

  const [hasToken, setHasToken] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  // If token is not checked yet (null), avoid flicker on hydration
  if (hasToken === null) return null;

  const isAuthPage = authRoutes.includes(pathname ?? "");
  const shouldShowLayout = !isAuthPage && hasToken;

  return (
    <html lang="en">
      <body style={{ backgroundColor: theme.palette.background.default }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {shouldShowLayout && <Header />}
            <Container maxWidth="sm">{props.children}</Container>
            {shouldShowLayout && <BottomNavigationBar />}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
