import React from "react";
import ReactDOM from "react-dom/client";

import "./style.css";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import AuthProvider from "./auth/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>
);
