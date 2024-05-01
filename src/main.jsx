import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalCustomTheme from "./assets/globaltheme/globalCustomTheme.jsx";
import "typeface-roboto";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={GlobalCustomTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
