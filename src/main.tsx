import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/index.tsx";
import { BrowserRouter } from "react-router-dom";
import { TransactionsProvider } from "./context/TransactionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TransactionsProvider>
        <AppRouter />
      </TransactionsProvider>
    </BrowserRouter>
  </StrictMode>
);
