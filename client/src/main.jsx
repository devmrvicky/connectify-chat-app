import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { LatestDataProvider } from "./context/LatestDataProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <LatestDataProvider>
          <RouterProvider router={router} />
        </LatestDataProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
