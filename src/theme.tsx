import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#950000',
    },
    secondary: {
      main: '#424242',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          "boxShadow": "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
  }
});

export default theme;
