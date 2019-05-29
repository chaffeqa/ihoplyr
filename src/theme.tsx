import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
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
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        "boxShadow": "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
  }
});

export default theme;
