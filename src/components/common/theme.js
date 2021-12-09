/*
 * The Material-UI theme for the whole UI
 */
import { createTheme } from '@mui/material/styles';

export default createTheme({
  spacing: 8,
  typography: {
    fontSize: 16,
    fontFamily: ['Lato', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ',',
    ),
    h1: {
      fontSize: '48px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '32px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 700,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '16px',
    },
  },
  palette: {
    primary: {
      main: '#86C232',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F7FBF7',
    },
    textPrimary: {
      main: '#373A3E',
    },
    textSecondary: {
      main: '#848484',
      lightGrey: '#7A7A7A',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
