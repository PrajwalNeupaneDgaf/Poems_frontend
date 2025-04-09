import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import UserContext from "./Context/UserContext.jsx";
createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <UserContext>
      <App />
    </UserContext>
  </ChakraProvider>
);
