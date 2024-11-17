"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
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
          ":disabled": "#F0F2ED",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#61892F",
          textDecoration: "underline",
          variants: [
            {
              props: props => props.variant === "sub",
              style: {
                fontSize: "12px",
              },
            },
          ],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: props => props.variant === "sub",
              style: {
                fontSize: "12px",
                color: "#22262999",
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
