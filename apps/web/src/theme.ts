'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#61892F',
      contrastText: '#FFFFFF',
      dark: '#4a6b24',
    },
    text: {
      primary: '#222629DE',
    },
    secondary: {
      main: '#FFFFFF',
    },
    action: {
      disabledBackground: '#0000001F',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h5: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32px',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '21px',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
