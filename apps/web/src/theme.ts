"use client";

import { Roboto } from "next/font/google";
import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
  ThemeOptions,
} from "@mui/material/styles";

// Load Roboto font
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// ======= Add Custom Palette Types =======
declare module "@mui/material/styles" {
  interface Palette {
    header: PaletteColor;
  }

  interface PaletteOptions {
    header?: PaletteColorOptions;
  }

  interface TypographyVariants {
    sub: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    sub?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    sub: true;
  }
}

declare module "@mui/material/Link" {
  interface LinkPropsVariantOverrides {
    sub: true;
  }
}

// ======= Create Theme =======
const theme = createTheme({
  palette: {
    primary: {
      main: "#61892F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#61892F",
    },
    action: {
      disabledBackground: "#DCE0D7",
      disabled: "#22262961",
    },
    header: {
      main: "#86c232",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    sub: {
      fontSize: "12px",
      color: "#22262999",
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#F0F2ED",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ":disabled": {
            backgroundColor: "#F0F2ED",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#61892F",
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
