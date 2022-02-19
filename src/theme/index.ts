import { createTheme } from "@material-ui/core";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1366,
      xl: 1920,
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: "Roboto",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          boxSizing: "border-box",
          fontFamily: "Roboto",
          backgroundColor: "#fff",
        },
        svg: {
          display: "inline-block",
        },
      },
    },
  },
});

export default theme;
