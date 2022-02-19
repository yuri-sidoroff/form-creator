import { VFC } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

export const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" element={Home} />
      </BrowserRouter>
    </ThemeProvider>
  );
};
