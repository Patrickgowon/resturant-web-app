// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./component/CartContext";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
