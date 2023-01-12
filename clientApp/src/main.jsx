import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { theme } from "./style/theme";
import { store } from "./app/store";
import App from "./routes/App";
import "./style/index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
